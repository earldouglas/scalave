package com.earldouglas.scalave.evaluator

object Evaluator {

  def eval(src: String): String = {
    val evaluator = new Evaluator(src)
    val manager = new Manager(evaluator)

    val evaluatorT = new Thread(evaluator)
    val managerT = new Thread(manager)

    managerT.start
    evaluatorT.start

    managerT.join
    evaluatorT.interrupt

    evaluator.result getOrElse "(evaluation was terminated after 10 seconds)"
  }

}

class Evaluator(src: String) extends Runnable {

  private[this] var _result: Option[String] = None
  def result: Option[String] = _result

  def run() {
    _result =
      Option(
        try {
  	val eval = new com.twitter.util.Eval
  	eval.apply[Any](src).toString
        } catch {
  	case e: Exception => e.toString
        }
      )
  }

}

class Manager(evaluator: Evaluator) extends Runnable {

  def timedout(start: Long): Boolean =
    ((System.currentTimeMillis - start) > 10000)

  def done: Boolean =
    evaluator.result.isDefined

  def run() {
    val start = System.currentTimeMillis
    while (!done && !timedout(start)) {
      Thread.sleep(100)
    }
  }
}
