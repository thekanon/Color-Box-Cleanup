"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Intro = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "컬러 매칭 게임에 오신 것을 환영합니다!",
      content: (
        <>
          <p className="text-lg mb-4">
            이 게임은 같은 색상의 블록을 맞추어 점수를 얻는 퍼즐 게임입니다.
          </p>
          <Image
            src="/intro/step1-2.png"
            alt="color matching game overview"
            width={200}
            height={200}
          />
        </>
      ),
    },
    {
      title: "기본 게임 플레이",
      content: (
        <>
          <p className="text-lg mb-4">
            블록을 이동시켜 같은 색상의 블록 3개 이상을 세로로 맞춰 제거하세요.
          </p>
          <Image
            src="/intro/step1-1.png"
            alt="matching blocks"
            width={200}
            height={200}
          />
        </>
      ),
    },
    {
      title: "점수 획득과 난이도 상승",
      content: (
        <>
          <p className="text-lg mb-4">
            블록을 제거할 때마다 점수가 올라갑니다. 점수가 높아질수록 새로운 색상의 블록이 추가되어 난이도가 올라갑니다.
          </p>
          <Image
            src="/intro/step1-2.png"
            alt="score and difficulty increase"
            width={200}
            height={200}
          />
        </>
      ),
    },
    {
      title: "게임 조작 방법",
      content: (
        <ul className="list-disc list-inside text-left text-lg mb-4">
          <li>화살표 키나 블록 터치로 이동 및 선택</li>
          <li>{"'Add Block' 버튼이나 위쪽 화살표로 새 행 추가"}</li>
          <li>타이머가 끝나기 전에 최대한 많은 점수를 획득하세요!</li>
        </ul>
      ),
    },
    {
      title: "게임 시작 준비",
      content: (
        <p className="text-lg mb-4">
          이제 규칙을 모두 이해하셨나요? 아래 버튼을 클릭하여 게임을 시작하세요!
        </p>
      ),
    },
  ];

  return (
    <div className="intro-page h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">{steps[step].title}</h1>
      <div
        data-cb-embedded="banner-group"
        data-campaign-id="yqezhiipibzc"
      ></div>

      {steps[step].content}
      <div className="mt-6">
        {step < steps.length - 1 ? (
          <button
            className="bg-teal text-white font-bold py-2 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            onClick={() => setStep(step + 1)}
          >
            다음
          </button>
        ) : (
          <Link href="/game">
            <button className="bg-teal text-white font-bold py-2 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              게임 시작
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Intro;