import React from 'react';
import GlossaryView from '../../src/components/GlossaryView.jsx';
import { GLOSSARY, CATS } from '../content/glossary.js';

export default function GlossaryPage() {
  return <GlossaryView glossary={GLOSSARY} cats={CATS} placeholder="例如：contrapositive、谬误、such that" />;
}
