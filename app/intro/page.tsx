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
            블록을 이동시켜 같은 블록 3개 이상을 맞춰 제거하고 점수를
            획득하세요.
          </p>
          <Image
            src="/intro/step1-1.png"
            alt="color matching game"
            width={100}
            height={100}
          />
          <p className="text-lg mb-4">
            점수가 높아질수록 더 많은 색상이 추가되어 게임이 더욱 어려워집니다.
          </p>
          <Image
            src="/intro/step1-2.png"
            alt="color matching game"
            width={100}
            height={100}
          />
        </>
      ),
    },
    {
      title: "게임 방법:",
      content: (
        <ul className="list-disc list-inside text-left text-lg mb-4">
          <li>화살표 키, 혹은 블럭을 터치하여 블록을 이동하고 선택합니다.</li>
          <li>
            세로로 동일한 색상의 블록 3개 이상을 맞춰 제거하고 점수를
            획득하세요.
          </li>
          <li>점수가 올라가면 새로운 색상의 블록이 추가됩니다.</li>
          <li>
            {`'Add Block' 버튼이나 위쪽 화살표 키를 눌러 새로운 행을 추가하세요.`}
          </li>
          <li>타이머에 주의하세요! 시간이 다 되면 게임이 초기화됩니다.</li>
        </ul>
      ),
    },
    {
      title: "게임 시작 준비",
      content: (
        <p className="text-lg mb-4">
          도전할 준비가 되셨나요? 아래 버튼을 클릭하여 게임을 시작하세요!
        </p>
      ),
    },
  ];

  return (
    <div className="intro-page h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">{steps[step].title}</h1>
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
