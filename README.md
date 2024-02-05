# Welcome to the Helm Tutorial Workshop!

In this workshop, we will dive into the world of Helm, a powerful package manager for Kubernetes. We will explore how to define, install, and upgrade even the most complex Kubernetes applications.

You will learn how to create Helm charts, manage dependencies, and configure efficient deployments. We will also touch upon handling secrets in Kubernetes, using real-world examples.

This workshop is designed for developers who have a basic understanding of Kubernetes and want to level up their skills by mastering Helm.

Let's embark on this exciting journey to simplify Kubernetes application deployment with Helm!

## What is Helm?

Helm is a package manager for Kubernetes that helps you define, install, and upgrade even the most complex Kubernetes applications. It is a tool that streamlines installing and managing Kubernetes applications. Think of it like apt/yum/homebrew for Kubernetes.

Helm uses a packaging format called charts. A chart is a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

## Why Helm?

Helm is a powerful tool that simplifies the deployment and management of Kubernetes applications. It provides the following benefits:

- **Reusability**: Helm charts can be shared and reused across different projects, making it easy to deploy applications consistently.
- **Versioning**: Helm charts can be versioned, making it easy to track changes and roll back to previous versions if needed.
- **Templating**: Helm uses Go templating to generate Kubernetes manifest files, allowing you to define dynamic configurations.
- **Dependency Management**: Helm allows you to manage dependencies between Kubernetes resources, making it easy to deploy complex applications.
- **Secret Management**: Helm provides a way to manage secrets in Kubernetes, allowing you to securely store sensitive information.
- **Community Support**: Helm has a large and active community, with a rich ecosystem of charts and plugins.
- **Extensibility**: Helm can be extended with plugins, allowing you to customize and extend its functionality.
- **Declarative Configuration**: Helm uses a declarative configuration format, making it easy to define and manage Kubernetes resources.
- **Upgradeability**: Helm makes it easy to upgrade applications to new versions, with support for rolling updates and rollback.
- **Auditability**: Helm provides a way to audit changes to your Kubernetes resources, making it easy to track changes and troubleshoot issues.
- **Consistency**: Helm provides a consistent way to deploy applications across different environments, making it easy to maintain consistency.
- **Productivity**: Helm simplifies the deployment and management of Kubernetes applications, allowing you to focus on building and shipping your applications.
- **Best Practices**: Helm promotes best practices for Kubernetes application deployment, making it easy to follow industry standards.
- **Integration**: Helm integrates with other tools and platforms, making it easy to use it in your existing workflows.
- **Documentation**: Helm has extensive documentation and resources, making it easy to get started and learn more about it.


The list goes on and on, but these are some of the key benefits of using Helm for Kubernetes application deployment.
Note that while the straight yaml files are ok for learning the basics they are very verbose, rigid, and hard (virtually impossible) to manage at scale. Helm is a tool that helps manage the complexity of Kubernetes deployments and is a must-have tool for anyone working with Kubernetes.

## What You Will Learn

- How to create a Helm chart for a simple application
- How to install and upgrade the application using Helm
- How to manage dependencies in Helm
- How to handle secrets in Kubernetes using Helm
- How to use Helm to deploy a real-world application

## Prerequisites

Before you begin, ensure you have the following tools installed on your local machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/docs/intro/install/)

In docker desktop, ensure you go to the Settings Icon > Kubernetes > Enable Kubernetes.
This will take a few moments to configure as it sets up a local Kubernetes cluster.

## Create your "Application Helm Chart"

Helms charts are a collection of files that describe a related set of Kubernetes resources. Helm charts are a great way to define, install, and upgrade even the most complex Kubernetes applications.

In this workshop, we will create a Helm chart for a simple application. We will then install and upgrade the application using Helm.

### Small Prep Step run this first

This is for the DEMO, do not do this in prod. This helps demonstrate the secret functionality that can be consumed by the application in a way that is external to the application and helm chart. 

```bash
kubectl create secret generic postgresql-secret \
--from-literal=username=adminuser \
--from-literal=password=password123
```

In production, there are entire tool suites for secret management, and it is a complex beast to tackle. For those who are interested, here are some resources and integration instructions for the most popular secret management tools:

- [HashiCorp Vault](https://www.vaultproject.io/docs/platform/k8s)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating-kube.html)
- [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/tutorial-kubernetes)
- [Google Cloud Secret Manager](https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform)

Notice the links are integration documents to both introduce the tool and how to integrate to Kubernetes.

### Create a Helm Chart

To create a Helm chart, run the following command from the terminal in a project directory, a personal favorite of mine
is to put all my projects in `~/projects` and change into it like so:

```bash
mkdir ~/projects/ && \
cd ~/projects/
```

With that out of the way we are going to create what is called a "Parent Chart" with the command:
```bash
helm create application
```

This will create a directory called `application` with the following structure:

```bash
application/
  Chart.yaml          # A YAML file containing information about the chart
  values.yaml         # The default configuration values for this chart
  charts/             # A directory containing any charts upon which this chart depends
  templates/          # A directory of templates that, when combined with values, will generate valid Kubernetes manifest files
  ...
```
