
import React, { useEffect, useRef } from 'react';
import { UserProfile } from '../types';

interface VideoViewProps {
  partner: UserProfile;
  onEnd: () => void;
}

declare var JitsiMeetExternalAPI: any;

const VideoView: React.FC<VideoViewProps> = ({ partner, onEnd }) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const domain = "8x8.vc";
    const options = {
      roomName: `vpaas-magic-cookie-979929292929292/PerfectPeople_${Date.now()}`,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: 'You',
      },
      configOverwrite: {
        disableDeepLinking: true,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          'e2ee'
        ],
      },
    };

    const api = new JitsiMeetExternalAPI(domain, options);

    api.addEventListener('videoConferenceLeft', () => {
      onEnd();
    });

    return () => api.dispose();
  }, [onEnd]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      <div className="bg-pink-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <img src={`https://picsum.photos/seed/${partner.id}/50/50`} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
          <span className="font-bold">Chatting with {partner.name}</span>
        </div>
        <button 
          onClick={onEnd}
          className="bg-white text-pink-600 px-6 py-2 rounded-full font-black hover:bg-pink-50 transition-colors"
        >
          Leave Call
        </button>
      </div>
      <div ref={jitsiContainerRef} className="flex-1 w-full" />
    </div>
  );
};

export default VideoView;
