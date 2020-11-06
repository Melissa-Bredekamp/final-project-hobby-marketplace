import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../utilities/types';

type Props = {
  user: User;
};

export default function NewUser(props: Props) {
  const [offer, setoffer] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  return;
}
