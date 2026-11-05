export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: 'dashboard' | 'sparkles' | 'shield';
}

export const LOGIN_CONFIG = {
  brand: {
    name: 'OpenLens',
    logoColor: '#2563eb',
    badgeColor: '#818cf8',
  },
  header: {
    title: 'Sign in to OpenLens',
    subtitle: 'Welcome back! Please enter your details.',
  },
  fields: {
    email: {
      label: 'Email',
      placeholder: 'you@company.com',
      type: 'email',
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      showLabel: 'Show',
      hideLabel: 'Hide',
    },
  },
  actions: {
    forgotPasswordText: 'Forgot password?',
    forgotPasswordUrl: '#forgot-password',
    submitText: 'Sign in',
    submittingText: 'Signing in...',
    dividerText: 'OR',
    googleSignInText: 'Sign in with Google',
  },
  hero: {
    titlePrefix: 'Turn your data into',
    titleHighlight: 'actionable intelligence.',
    subtitle: "Connect, analyze, and scale your data workflows with OpenLens's powerful AI-driven analytics platform.",
  },
  features: [
    {
      id: 'unify',
      title: 'Unify your data',
      description: 'Bring your data sources together in one place.',
      icon: 'dashboard',
    },
    {
      id: 'ai',
      title: 'AI-powered insights',
      description: 'Discover patterns and trends with intelligent analytics.',
      icon: 'sparkles',
    },
    {
      id: 'security',
      title: 'Secure & scalable',
      description: 'Built to grow with your data and workflows.',
      icon: 'shield',
    },
  ] as FeatureItem[],
  footer: {
    copyright: `© ${new Date().getFullYear()} OpenLens. All rights reserved.`,
  },
};