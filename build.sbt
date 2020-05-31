name := "scalave"

organization := "com.earldouglas"

scalaVersion := "2.12.11"

libraryDependencies ++=
  Seq( "javax.servlet"                     %  "javax.servlet-api" % "3.1.0" % "provided"
     , "com.twitter"                       %% "util-eval"         % "6.43.0"
     , "com.github.spullara.mustache.java" %  "compiler"          % "0.9.6"
     )

libraryDependencies ++=
  Seq( "org.eclipse.jetty" %  "jetty-webapp"      % "9.1.0.v20131115" % "test"
     , "org.eclipse.jetty" %  "jetty-plus"        % "9.1.0.v20131115" % "test"
     , "javax.servlet"     %  "javax.servlet-api" % "3.1.0"           % "test"
     , "org.scalatest"     %% "scalatest"         % "3.1.2"           % "test"
     )

enablePlugins(JettyPlugin)

enablePlugins(HerokuDeploy)
herokuDeployLib := "com.heroku.sdk" % "heroku-deploy" % "1.1.3"
herokuAppName   := "scalave"
