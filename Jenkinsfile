def wrapStep(String stepName, Closure step) {
  println "In wrapStep ${stepName}"
  try {
    step(stepName)
  } catch (e) {
    notify('FAILED', stepName)
    throw e
  }
}



node('insights-frontend-slave') {
  if ('master' == env.BRANCH_NAME) {
    wrapStep('clone', { name -> stage(name) { checkout scm } })
    wrapStep('deploy_legacy_api', { name -> stage(name) {
      sh 'rsync -arv -e "ssh -2" uploader.json* sshacs@unprotected.upload.akamai.com:/114034/r/insights/v1/static/'
      sh 'rsync -arv -e "ssh -2" core sshacs@unprotected.upload.akamai.com:/114034/r/insights/v1/static/'
    } })

    for (item in ['insights', 'insightsbeta', 'insightsalpha']) {
      RSYNC_CMD = "rsync -arv -e \"ssh -2\" --exclude 'uploader.json*' --exclude core ./* sshacs@unprotected.upload.akamai.com:/114034/${item}/static/"
      wrapStep("deploy_${item}", { name -> stage(name) { sh RSYNC_CMD } })
      println(RSYNC_CMD)
    }
  }

  if ('dev' == env.BRANCH_NAME) {
    wrapStep('clone', { name -> stage(name) { checkout scm } })
    wrapStep('deploy_insights', { name -> stage(name) { sh 'rsync -avPS * root@fakamai.usersys.redhat.com:/tmp/static/' } })
  }
}
