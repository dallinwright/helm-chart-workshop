### Small Prep Step run this first

This is for the DEMO, do not do this in prod. This just helps demonstrate the secret functionality
and secrets should be external in tool like vault or ideally the cloud providers secret manager.

```bash
kubectl create secret generic postgresql-secret --from-literal=username=adminuser --from-literal=password=password123
```