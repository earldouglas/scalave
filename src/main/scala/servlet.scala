package com.earldouglas.scalave.servlets

import scala.xml.NodeSeq
import javax.servlet.http.HttpServlet

class Scalave extends HttpServlet {

  import javax.servlet.http.HttpServletRequest
  import javax.servlet.http.HttpServletResponse

  val eval = new com.twitter.util.Eval

  override def doGet(req: HttpServletRequest, res: HttpServletResponse) {

    res.setContentType("text/html")
    res.setCharacterEncoding("UTF-8")

    val responseBody: NodeSeq =
      <html>
        <body>
          <h1>Hello, world!</h1>
        </body>
      </html>

    res.getWriter.write(responseBody.toString)
  }

  override def doPost(req: HttpServletRequest, res: HttpServletResponse) {
    val out = eval.apply[Any](req.getInputStream)
    res.getWriter.write(out.toString)
  }
}
