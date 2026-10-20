import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { profile } from './content';
import './personal-components.css';

const photos = [
  ['smile', '微笑'], ['laugh', '大笑'], ['think', '思考'],
  ['surprise', '惊讶'], ['wink', '眨眼'],
].map(([id, label]) => ({ id, label, src: `${import.meta.env.BASE_URL}assets/avatar-${id}.png` }));

export default function PersonalPhotoCard({ theme }) {
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  useEffect(() => {
    // Warm the other expressions so a click never waits for an empty image.
    photos.forEach(photo => { const image = new Image(); image.src = photo.src; });
  }, []);
  return <section className="personal-photo-card" aria-label="桂紫超的五种表情">
    <ProfileCard avatarUrl={photo.src} photoAlt={`桂紫超的个人形象：${photo.label}`}
      name={profile.name} title="" showUserInfo={false}
      theme={theme} backdropColor={theme === 'dark' ? '#203f50' : '#b9dbe8'}
      radius={14} holo={0.4} glare={0.18} tiltStrength={5} parallax={3} intro={false}
      onPhotoClick={() => setIndex(value => (value + 1) % photos.length)}
      nextPhotoLabel={`当前${photo.label}，点击切换为${photos[(index + 1) % photos.length].label}`} />
  </section>;
}
