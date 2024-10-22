import css from './LoadingContainer.module.scss';

import { Loading,Text } from '@geist-ui/react';

const LoadingContainer = ({ text }: { text?: string }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.spinner}>
        <Loading>{text && <Text type="secondary">{text}</Text>}</Loading>
      </div>
    </div>
  );
};

export default LoadingContainer;
