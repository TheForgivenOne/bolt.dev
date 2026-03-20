import { createFetchHandler } from '@remix-run/cloudflare';
import type { AppLoadContext, EntryContext } from '@remix-run/cloudflare';

interface Env {
  RUNNING_IN_DOCKER: string;
  DEFAULT_NUM_CTX: string;
  ANTHROPIC_API_KEY: string;
  OPENAI_API_KEY: string;
  GROQ_API_KEY: string;
  HuggingFace_API_KEY: string;
  OPEN_ROUTER_API_KEY: string;
  OLLAMA_API_BASE_URL: string;
  OPENAI_LIKE_API_KEY: string;
  OPENAI_LIKE_API_BASE_URL: string;
  OPENAI_LIKE_API_MODELS: string;
  TOGETHER_API_KEY: string;
  TOGETHER_API_BASE_URL: string;
  DEEPSEEK_API_KEY: string;
  LMSTUDIO_API_BASE_URL: string;
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  MISTRAL_API_KEY: string;
  XAI_API_KEY: string;
  PERPLEXITY_API_KEY: string;
  AWS_BEDROCK_CONFIG: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const build = await import('../build/server');

    const handler = createFetchHandler({
      build,
      mode: process.env.NODE_ENV || 'production',
      getLoadContext: () => ({ env }) as AppLoadContext,
    });

    return handler(request, { env, waitUntil: ctx.waitUntil.bind(ctx), passThroughOnException: () => {} });
  },
};

export {};
