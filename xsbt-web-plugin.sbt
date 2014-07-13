xwpSettings

libraryDependencies +=  "org.eclipse.jetty" % "jetty-runner" % "9.2.1.v20140609" % "container" intransitive()

launcher in container <<= jetty in container
