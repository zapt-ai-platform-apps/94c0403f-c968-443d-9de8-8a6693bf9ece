import React from 'react';
import { useParams } from 'react-router-dom';
import { DeveloperDetail } from '@/modules/developers/api';

export default function DeveloperDetailPage() {
  const { id } = useParams();
  
  return <DeveloperDetail id={id} />;
}