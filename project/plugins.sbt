// sonatype snapshots for xwp 0.10.0-SNAPSHOT
resolvers += Resolver.sonatypeRepo("snapshots")

addSbtPlugin("com.earldouglas" % "xsbt-web-plugin" % "0.10.0-SNAPSHOT")

addSbtPlugin("org.scoverage" %% "sbt-scoverage" % "0.98.0")

addSbtPlugin("com.sksamuel.scoverage" %% "sbt-coveralls" % "0.0.5")
