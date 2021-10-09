import React from 'react';
import Subconverter from './subconverter/Subconverter';
import styles from './App.module.less';

const App: React.FC = () => (
  <div className={styles.container}>
    <Subconverter className={styles.card} />
  </div>
);

export default App;
