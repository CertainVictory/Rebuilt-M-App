import { Space } from '@mantine/core';
import { MEDPLUM_VERSION } from '@medplum/core';
import { UserConfiguration } from '@medplum/fhirtypes';
import { AppShell, Loading, NavbarMenu, useMedplum } from '@medplum/react';
import {
  Icon,
  IconAffiliate,
  IconBuilding,
  IconCalendar,
  IconClipboardHeart,
  IconForms,
  IconHeart,
  IconHeartbeat,
  IconList,
  IconLocation,
  IconLock,
  IconLockAccess,
  IconMedicalCross,
  IconMicroscope,
  IconPackages,
  IconPhoto,
  IconReceipt,
  IconReportMedical,
  IconRobot,
  IconShieldLock,
  IconStethoscope,
  IconTargetArrow,
  IconUsersGroup,
  IconVaccine,
  IconWebhook,
  IconBrandAsana,
} from '@tabler/icons-react';
import { Suspense } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

import './App.css';
import { Logo } from './components/Logo';

export function App(): JSX.Element {
  const medplum = useMedplum();
  const config = medplum.getUserConfiguration();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (medplum.isLoading()) {
    return <Loading />;
  }

  return (
    <AppShell
      logo={
        <Logo
          size={24}
          sx={{
            transform: 'scale(1.3)',
          }}
        />
      }
      pathname={location.pathname}
      searchParams={searchParams}
      version={MEDPLUM_VERSION}
      menus={userConfigToMenu(config)}
      displayAddBookmark={!!config?.id}
    >
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </AppShell>
  );
}

function userConfigToMenu(config: UserConfiguration | undefined): NavbarMenu[] {
  const result =
    config?.menu?.map(menu => ({
      title: menu.title,
      links:
        menu.link?.map(link => ({
          label: link.name,
          href: link.target as string,
          icon: getIcon(link.target as string),
        })) || [],
    })) || [];

  result.push({
    title: 'Settings',
    links: [
      {
        label: 'Security',
        href: '/security',
        icon: <IconLock />,
      },
    ],
  });

  return result;
}

const resourceTypeToIcon: Record<string, Icon> = {
  Patient: IconHeart,
  Practitioner: IconStethoscope,
  Organization: IconBuilding,
  ServiceRequest: IconReceipt,
  DiagnosticReport: IconReportMedical,
  Questionnaire: IconForms,
  admin: IconShieldLock,
  Project: IconBrandAsana,
  AccessPolicy: IconLockAccess,
  Subscription: IconWebhook,
  batch: IconPackages,
  Observation: IconMicroscope,
  Bot: IconRobot,
  Task: IconList,
  CarePlan: IconClipboardHeart,
  PlanDefinition: IconClipboardHeart,
  Condition: IconHeartbeat,
  RelatedPerson: IconAffiliate,
  Goal: IconTargetArrow,
  Group: IconUsersGroup,
  Immunization: IconVaccine,
  Location: IconLocation,
  Media: IconPhoto,
  Schedule: IconCalendar,
  Procedure: IconMedicalCross,
};

function getIcon(to: string): JSX.Element | undefined {
  try {
    const resourceType = new URL(to, import.meta.env?.MEDPLUM_BASE_URL).pathname.split('/')[1];
    if (resourceType in resourceTypeToIcon) {
      const Icon = resourceTypeToIcon[resourceType];
      return <Icon />;
    }
  } catch (e) {
    // Ignore
  }
  return <Space w={30} />;
}
