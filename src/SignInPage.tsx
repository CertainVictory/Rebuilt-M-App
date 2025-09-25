import { Title } from '@mantine/core';
import { SignInForm } from '@medplum/react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { getConfig, isRegisterEnabled } from './config';
import { Logo } from './components/Logo';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const config = getConfig();

  return (
    <SignInForm
      onSuccess={() => navigate(searchParams.get('next') || '/')}
      onForgotPassword={() => navigate('/resetpassword')}
      onRegister={isRegisterEnabled() ? () => navigate('/register') : undefined}
      googleClientId={config.googleClientId}
      login={searchParams.get('login') || undefined}
      projectId={searchParams.get('project') || undefined}
    >
      <Logo size={48} />
      <Title>Sign in to the Marti Health Admin Console</Title>
      {searchParams.get('project') === 'new' && <div>Sign in again to create a new project</div>}
    </SignInForm>
  );
}
