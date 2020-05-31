package com.earldouglas.scalave.servlets

import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import com.earldouglas.scalave.evaluator.Evaluator

object `package` {

  private val mf = new com.github.mustachejava.DefaultMustacheFactory()

  implicit class MustacheResponse(res: HttpServletResponse) {
    def mustache[A](templateName: String, model: A): Unit = {
      res.setContentType("text/html")
      res.setCharacterEncoding("UTF-8")
      val is = getClass.getClassLoader.getResourceAsStream(templateName + ".mustache")
      val reader = new java.io.InputStreamReader(is)
      val mustache = mf.compile(reader, templateName)
      mustache.execute(res.getWriter, model)
    }
  }

}

class Scalave extends HttpServlet {

  def run(src: String, writer: java.io.Writer, json: Boolean): Unit = {
    val result = Evaluator.eval(src)
    val output =
      if (json) result.replaceAll("'", """\'""").
                       replaceAll("""\n""", """\\n""")
      else result
    writer.write(output)
  }

  case class Model(title: String)

  override def doGet(req: HttpServletRequest, res: HttpServletResponse) =
    Option(req.getParameter("src")) match {
      case None =>
        res.mustache("root", Model(title = "Scalave"))
      case Some(src) =>
        Option(req.getParameter("jsonp")) match {
        case None =>
          run(src, res.getWriter, false)
        case Some(jsonp) =>
          res.getWriter.write(jsonp)
          res.getWriter.write("('")
          run(src, res.getWriter, true)
          res.getWriter.write("');")
      }
    }


}
