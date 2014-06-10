name := "scalave"

organization := "com.earldouglas"

version := "0.1.0-SNAPSHOT"

scalaVersion := "2.10.3"

seq(webSettings :_*)

libraryDependencies ++= Seq(
    "org.eclipse.jetty" % "jetty-webapp" % "9.1.0.v20131115" % "container"
  , "org.eclipse.jetty" % "jetty-plus" % "9.1.0.v20131115" % "container"
  , "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided"
  , "com.twitter" %% "util-eval" % "6.5.0"
)

ScoverageSbtPlugin.instrumentSettings

CoverallsPlugin.coverallsSettings
