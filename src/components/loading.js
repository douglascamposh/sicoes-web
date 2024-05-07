import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="spinner mt-32">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
        <div className="bounce4"></div>
        <div className="bounce5"></div>
        <div className="bounce6"></div>
      </div>
      <style jsx>{`
        .spinner {
          width: 70px;
          height: 50px;
          text-align: center;
          font-size: 10px;
        }

        .spinner > div {
          background-color: #1E40AF;
          height: 100%;
          width: 8px;
          display: inline-block;
          animation: sk-stretchdelay 1.2s infinite ease-in-out;
        }

        .spinner > div:nth-child(even) {
          background-color: #3B82F6;
        }

        @keyframes sk-stretchdelay {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          60% {
            transform: scaleY(1.0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;