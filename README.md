# Open Management Portal - Back End

## How to deploy on OpenShift Container Platform

Ensure you're logged into your cluster on your cli by running:

- `oc login`

Next install the Ansible galaxy requirements:

- `cd .openshift-applier`
- `ansible-galaxy install -r requirements.yml -p roles`

Then kick off the openshift-applier:

- `ansible-playbook -i inventory apply.yml`

This will create an `omp-ci-cd` and `omp-dev` project with a build pipeline for the application.
