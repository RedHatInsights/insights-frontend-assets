def wrapStep(String stepName, Closure step) {
  println "In wrapStep ${stepName}"
  try {
    step(stepName)
  } catch (e) {
    notify('FAILED', stepName)
    throw e
  }
}


def notify(String mode, String step) {
  emailext (
    from: 'noreply@redhat.com',
    subject: header,
    recipientProviders: [[$class: 'DevelopersRecipientProvider']],
    body: """
${header}

Check out the pipeline view at  ${env.BUILD_URL}/../
Check out the console output at ${env.BUILD_URL}/console
"""
  )
}

node('insights-frontend-slave') {
  if ('master' == env.BRANCH_NAME) {
    wrapStep('clone', { name -> stage(name) { checkout scm } })
    wrapStep('deploy_insights', { name -> stage(name) { sh 'rsync -arv -e "ssh -2"     * sshacs@unprotected.upload.akamai.com:/114034/insights/static/' } })
    wrapStep('deploy_insightsbeta', { name -> stage(name) { sh 'rsync -arv -e "ssh -2" * sshacs@unprotected.upload.akamai.com:/114034/insightsbeta/static/' } })
    wrapStep('deploy_insightsbeta', { name -> stage(name) { sh 'rsync -arv -e "ssh -2" * sshacs@unprotected.upload.akamai.com:/114034/insightsalpha/static/' } })
    wrapStep('deploy_legacy_api', {
      name -> stage(name) {
        sh 'gpg --no-default-keyring --keyring ./redhattools.pub.gpg --verify uploader.json.asc uploader.json'
        sh 'gpg --no-default-keyring --keyring ./redhattools.pub.gpg --verify uploader.v2.json.asc uploader.v2.json'
        sh 'sdlkfjawoeknfa;okinje'
        sh 'rsync -arv -e "ssh -2" * sshacs@unprotected.upload.akamai.com:/114034/r/insights/v1/static/'
      }
    })
  }

  if ('dev' == env.BRANCH_NAME) {
    wrapStep('clone', { name -> stage(name) { checkout scm } })
    wrapStep('deploy_insights', { name -> stage(name) { sh 'rsync -avPS * root@fakamai.usersys.redhat.com:/tmp/static/' } })
  }
}
