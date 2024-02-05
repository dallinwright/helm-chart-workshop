### Small Prep Step run this first

This is for the DEMO, do not do this in prod. This just helps demonstrate the secret functionality
and secrets should be external in tool like vault or ideally the cloud providers secret manager.

```bash
kubectl create secret generic postgres-secret \
--from-literal=postgres-username=admin_user \
--from-literal=postgres-password=6iXr0B8sZTyVfP5AEsmv
```
