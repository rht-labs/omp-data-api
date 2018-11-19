docker run \
  -v $HOME/.kube/config:/openshift-applier/.kube/config:z \
  -v $PWD:/tmp/src \
  -e INVENTORY_PATH=/tmp/src/inventory \
  -t quay.io/redhat-cop/openshift-applier