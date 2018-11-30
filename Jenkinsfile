#!/usr/bin/groovy

String ocpApiServer = env.OCP_API_SERVER ? "${env.OCP_API_SERVER}" : "https://openshift.default.svc.cluster.local"

node('master') {

  env.NAMESPACE = readFile('/var/run/secrets/kubernetes.io/serviceaccount/namespace').trim()
  env.TOKEN = readFile('/var/run/secrets/kubernetes.io/serviceaccount/token').trim()
  env.OC_CMD = "oc --token=${env.TOKEN} --server=${ocpApiServer} --certificate-authority=/run/secrets/kubernetes.io/serviceaccount/ca.crt --namespace=${env.NAMESPACE}"

  def workspace = pwd()
  def groupVars = readYaml file: "${workspace}@script/.openshift-applier/inventory/group_vars/all.yml"
  env.APP_NAME = """${groupVars.app_name}"""
  
  println "Starting Pipeline for Application: ${APP_NAME}"
  println "${env.JOB_NAME}, ${env.NAMESPACE}"
  
  env.STAGE0 = """${groupVars.ci_cd_namespace}"""
  env.STAGE1 = """${groupVars.dev_namespace}"""
  // env.STAGE2 = """${groupVars.stage_namespace}"""
  // env.STAGE3 = """${groupVars.prod_namespace}"""
}

node('nodejs') {

  stage('SCM Checkout') {
    checkout scm
  }

  stage('Build Image') {
    openshift.withCluster() {
      openshift.withProject("${STAGE0}") {
        openshift.selector("bc", "${APP_NAME}").startBuild("--from-dir=.").logs("-f")
      }
    }
  }

  stage ("Promote from Build to Dev") {
    openshift.withCluster() {
      openshift.tag("${env.STAGE0}/${env.APP_NAME}:latest", "${env.STAGE1}/${env.APP_NAME}:latest")
    }
  }

  stage("Verify Deployment to ${env.STAGE1}") {

    openshiftVerifyDeployment(deploymentConfig: "${env.APP_NAME}", namespace: "${STAGE1}", verifyReplicaCount: true)

    // input "Promote Application to Stage?"
  }

//   stage("Promote To ${env.STAGE2}") {
//     sh """
//     ${env.OC_CMD} tag ${env.STAGE1}/${env.APP_NAME}:latest ${env.STAGE2}/${env.APP_NAME}:latest
//     """
//   }

//   stage("Verify Deployment to ${env.STAGE2}") {

//     openshiftVerifyDeployment(deploymentConfig: "${env.APP_NAME}", namespace: "${STAGE2}", verifyReplicaCount: true)

//     input "Promote Application to Prod?"
//   }

//   stage("Promote To ${env.STAGE3}") {
//     sh """
//     ${env.OC_CMD} tag ${env.STAGE2}/${env.APP_NAME}:latest ${env.STAGE3}/${env.APP_NAME}:latest
//     """
//   }

//   stage("Verify Deployment to ${env.STAGE3}") {

//     openshiftVerifyDeployment(deploymentConfig: "${env.APP_NAME}", namespace: "${STAGE3}", verifyReplicaCount: true)

//   }
}

println "Application ${env.APP_NAME} is now deployed!"
