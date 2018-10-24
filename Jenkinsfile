def rsync_stuff(stage_name, subpath) {
  stage(stage_name) {
    when {
      branch 'master'
      not {
        changeRequest()
      }
    }
    steps {
      sh "rsync -arv -e \"ssh -i /tmp/akamai-ssh -o StrictHostKeyChecking=no\" * sshacs@unprotected.upload.akamai.com:/111034/${subpath}"
    }
  }
}

def envs = [
            'deploy_to_frontend_legacy': 'insights/static/frontend-legacy/',
            'deploy_insights': 'insights/static/',
            'deploy_insightsbeta': 'insightsbeta/static/',
            'deploy_insightsalpha': 'insightsalpha/static/',
            'deploy_legacy_api': 'r/insights/v1/static/'
           ]

pipeline {
  agent {
    node {
      label 'python'
    }
  }
  stages {
    stage('Write SSH Key') {
      steps {
        writeFile file: "/tmp/akamai-ssh", text: "${env.AKAMAI_SSH_KEY}\n-----END RSA PRIVATE KEY-----"
        sh 'chmod 600 /tmp/akamai-ssh'
      }
    }
    envs.each { k, v -> rsync_stuff(${k}, ${v})}
  }
}
