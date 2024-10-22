import css from './TheHeader.module.scss';

import { Grid, Select, Tooltip } from '@geist-ui/react';
import { FilePlus, Icon, Info } from '@geist-ui/react-icons';
import Link from 'next/link';

import languages from '@/lib/languages';

import { useState, useEffect } from 'react';
import checkMobile from 'ismobilejs';

export interface NavigationItem {
  url?: string;
  external?: boolean;
  icon: Icon;
  tooltip: string;
  onClick?(): any;
}

export interface TheHeaderProps {
  items: NavigationItem[];
  displayLanguages?: boolean;
  documentLanguage?: string;
  setDocumentLanguage?(language: string): any;
}

const TheHeader = ({
  items,
  displayLanguages,
  documentLanguage,
  setDocumentLanguage,
}: TheHeaderProps) => {
  const navigationItems = [
    {
      url: '/',
      tooltip: 'New (ctrl+i)',
      icon: FilePlus,
    },
    {
      url: '/about',
      tooltip: 'About',
      icon: Info,
    },

    ...items,
  ];

  const [headerClasses, setHeaderClasses] = useState(
    [css.wrapper, css.mobileHeader].join(' '),
  );
  const [tooltipPlacement, setTooltipPlacement] = useState<'bottom' | 'top'>(
    'bottom',
  );

  useEffect(() => {
    const isMobile = checkMobile(window.navigator).any;

    if (isMobile) {
      setTooltipPlacement('top');
    } else {
      setHeaderClasses(css.wrapper);
    }
  }, []);

  return (
    <header className={headerClasses}>
      <Grid.Container justify="space-between" height="65px">
        <Grid align="middle" xs={12} className={css.sitename}>
          <h1>
            fastbin
            <sup>
              <small>
                <strong>v2</strong>
              </small>
            </sup>
          </h1>
        </Grid>
        <Grid xs={12} className={css.navigationWrapper}>
          <Grid.Container justify="end" gap={0.8}>
            {displayLanguages && (
              <Grid xs={6} className={css.languageRow}>
                <Select
                  initialValue={documentLanguage || 'plain'}
                  onChange={setDocumentLanguage}
                >
                  {Object.keys(languages).map((id) => {
                    const language = languages[id];

                    return (
                      <Select.Option value={language.id} key={id}>
                        {language.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Grid>
            )}

            <Grid xs={6}>
              {navigationItems.map((item, idx) => (
                <Tooltip
                  key={idx}
                  text={item.tooltip}
                  placement={tooltipPlacement}
                  className={css.navItem}
                >
                  {item.url && !item.external && (
                    <Link href={item.url}>
                        <item.icon size={36} />
                    </Link>
                  )}

                  {item.url && item.external && (
                    <Link href={item.url}>
                      <item.icon size={36} />
                    </Link>
                  )}

                  {item.onClick && (
                    <item.icon onClick={item.onClick} size={36} />
                  )}
                </Tooltip>
              ))}
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </header>
  );
};

export default TheHeader;
