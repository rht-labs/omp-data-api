# Open Management Portal - Back End

## How to deploy on OpenShift Container Platform

Ensure you're logged into your cluster on your cli by running:

- `oc login`

Next navigate to the applier directory:

- `cd .openshift-applier`

Then kick off the openshift-applier using the container image:

- `./run.sh`

This will create an `omp-ci-cd` and `omp-dev` project with a build pipeline for the application.
