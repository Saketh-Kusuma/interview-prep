import type { Topic } from "../types";

/**
 * Not present in the source syllabus — authored to fill the deployment gap the
 * priority table implies. Flagged `authored: true` so the UI can label it.
 */
export const dockerAws: Topic = {
  slug: "docker-aws",
  rank: 16,
  band: "yellow",
  title: "Docker / AWS / DevOps",
  stars: 3,
  authored: true,
  notes: [
    {
      kind: "callout",
      text: "Interviewers usually just want to hear that you have deployed something and can explain how. Depth beyond that is a bonus.",
    },
  ],
  sections: [
    {
      slug: "docker",
      title: "Docker",
      subtopics: [
        { slug: "what-is-docker", title: "What is Docker" },
        { slug: "image-vs-container", title: "Image vs container" },
        { slug: "dockerfile", title: "Dockerfile" },
        { slug: "layers-caching", title: "Layers & build caching" },
        { slug: "multi-stage-builds", title: "Multi-stage builds" },
        { slug: "volumes", title: "Volumes" },
        { slug: "port-mapping", title: "Port mapping" },
        { slug: "networks", title: "Networks" },
        { slug: "docker-compose", title: "Docker Compose" },
        { slug: "env-vars", title: "Environment variables & secrets" },
        { slug: "vm-vs-container", title: "VM vs container" },
      ],
    },
    {
      slug: "aws",
      title: "AWS",
      subtopics: [
        { slug: "regions-az", title: "Regions & availability zones" },
        { slug: "iam", title: "IAM (users, roles, policies)" },
        { slug: "ec2", title: "EC2" },
        { slug: "s3", title: "S3" },
        { slug: "rds", title: "RDS" },
        { slug: "vpc-basics", title: "VPC basics & security groups" },
        { slug: "elastic-beanstalk", title: "Elastic Beanstalk" },
        { slug: "ecs-fargate", title: "ECS / Fargate" },
        { slug: "lambda", title: "Lambda & serverless basics" },
        { slug: "cloudwatch", title: "CloudWatch (logs & metrics)" },
        { slug: "deploying-an-app", title: "Deploying a full-stack app end to end" },
      ],
    },
    {
      slug: "cicd",
      title: "CI/CD & Orchestration",
      notes: [
        {
          kind: "callout",
          text: "Knowing what a pipeline does and where your build fits is enough. You are not expected to author Kubernetes manifests.",
        },
      ],
      subtopics: [
        { slug: "ci-cd-pipeline", title: "What a CI/CD pipeline does" },
        { slug: "jenkins-pipeline", title: "Jenkins pipeline (stages, Jenkinsfile)" },
        { slug: "kubernetes-basics", title: "Kubernetes basics (pod, service, deployment)" },
        { slug: "blue-green-deployment", title: "Blue-green deployment" },
      ],
    },
  ],
};
