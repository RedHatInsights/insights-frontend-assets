def wrapStep(String stepName, Closure step) {
  println "In wrapStep ${stepName}"
  step(stepName)
}

node('python') {
  stage('write_ssh_key') {
    steps {
      writeFile file: "/tmp/akamai-ssh", text: "${env.AKAMAI_SSH_KEY}\n-----END RSA PRIVATE KEY-----"
      sh "chmod 600 /tmp/akamai-ssh"
    }
  }
  if ('master' == env.BRANCH_NAME) {
    wrapStep('deploy_to_frontend_legacy', { name -> stage(name) { sh "rsync -arv -e \"ssh -i /tmp/akamai-ssh -o StrictHostKeyChecking=no\" * sshacs@unprotected.upload.akamai.com:/111034/insights/static/frontend-legacy/"} })
    wrapStep('deploy_insights', { name -> stage(name) { sh "rsync -arv -e \"ssh -i /tmp/akamai-ssh -o StrictHostKeyChecking=no\" * sshacs@unprotected.upload.akamai.com:/111034/insights/static/"} })
    wrapStep('deploy_insightsbeta', { name -> stage(name) { sh "rsync -arv -e \"ssh -i /tmp/akamai-ssh -o StrictHostKeyChecking=no\" * sshacs@unprotected.upload.akamai.com:/111034/insightsbeta/static"} })
    wrapStep('deploy_insightsalpha', { name -> stage(name) { sh "rsync -arv -e \"ssh -i /tmp/akamai-ssh -o StrictHostKeyChecking=no\" * sshacs@unprotected.upload.akamai.com:/111034/insightsalpha/static/"} })
    wrapStep('deploy_legacy_api', { name -> stage(name) { sh "rsync -arv -e \"ssh -i /tmp/akamai-ssh -o StrictHostKeyChecking=no\" * sshacs@unprotected.upload.akamai.com:/111034/r/insights/v1/static/"} })
  }
}