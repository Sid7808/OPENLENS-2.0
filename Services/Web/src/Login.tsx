import React, { useState } from 'react';
import { LOGIN_CONFIG, type FeatureItem } from './config/loginconfig';
import { authService } from './authService';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      // Redirect or update auth state here
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className="login-container">
      {/* ================= LEFT SIDE: FORM ================= */}
      <div className="login-left-pane">
        <div className="login-form-wrapper">
          <div className="login-brand">
            <OpenLensLogo size={24} color={LOGIN_CONFIG.brand.logoColor} />
            <span className="login-brand-name">{LOGIN_CONFIG.brand.name}</span>
          </div>

          <div className="login-header">
            <h1 className="login-title">{LOGIN_CONFIG.header.title}</h1>
            <p className="login-subtitle">{LOGIN_CONFIG.header.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-banner">{error}</div>}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {LOGIN_CONFIG.fields.email.label}
              </label>
              <input
                id="email"
                type={LOGIN_CONFIG.fields.email.type}
                placeholder={LOGIN_CONFIG.fields.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {LOGIN_CONFIG.fields.password.label}
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={LOGIN_CONFIG.fields.password.placeholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password-btn"
                >
                  {showPassword
                    ? LOGIN_CONFIG.fields.password.hideLabel
                    : LOGIN_CONFIG.fields.password.showLabel}
                </button>
              </div>
              <div className="forgot-password-row">
                <a href={LOGIN_CONFIG.actions.forgotPasswordUrl} className="forgot-password-link">
                  {LOGIN_CONFIG.actions.forgotPasswordText}
                </a>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? LOGIN_CONFIG.actions.submittingText : LOGIN_CONFIG.actions.submitText}
            </button>

            <div className="divider-row">
              <div className="divider-line" />
              <span className="divider-text">{LOGIN_CONFIG.actions.dividerText}</span>
              <div className="divider-line" />
            </div>

            <button type="button" onClick={handleGoogleSignIn} className="google-btn">
              <GoogleIcon />
              <span>{LOGIN_CONFIG.actions.googleSignInText}</span>
            </button>
          </form>

          <p className="login-copyright">{LOGIN_CONFIG.footer.copyright}</p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: BRANDING ================= */}
      <div className="login-right-pane">
        <div className="ambient-glow" />

        <div className="hero-content">
          <div className="glowing-hex-badge">
            <OpenLensLogo size={32} color={LOGIN_CONFIG.brand.badgeColor} />
          </div>

          <h2 className="hero-title">
            {LOGIN_CONFIG.hero.titlePrefix} <br />
            <span className="gradient-text">{LOGIN_CONFIG.hero.titleHighlight}</span>
          </h2>

          <p className="hero-subtitle">{LOGIN_CONFIG.hero.subtitle}</p>

          <div className="features-list">
            {LOGIN_CONFIG.features.map((feature: FeatureItem) => (
              <div key={feature.id} className="feature-item">
                <div className="feature-icon-box">
                  {renderFeatureIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Highlight Chart Card */}
        <div className="chart-preview-card">
          <div className="chart-bars">
            <div className="bar bar-1" />
            <div className="bar bar-2" />
            <div className="bar bar-3" />
            <div className="bar bar-active" />
            <div className="bar bar-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS & ICONS ================= */

function renderFeatureIcon(iconType: FeatureItem['icon']) {
  switch (iconType) {
    case 'dashboard':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01M12 12v4" strokeLinecap="round" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
  }
}

function OpenLensLogo({ size = 24, color = '#2563eb' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
    </svg>
  );
}
