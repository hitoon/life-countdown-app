'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const lifeExpectancy = 80;

  const [birthYear, setBirthYear] = useState<number>(1995);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);

  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [mealCountPerDay, setMealCountPerDay] = useState<number>(3); // 1日の食事回数の状態
  const [remainingMeals, setRemainingMeals] = useState<number>(0); // 残り食事回数の状態
  const [remainingWeekends, setRemainingWeekends] = useState<number>(0); // 残り週末回数の状態
  const [remainingSummers, setRemainingSummers] = useState<number>(0); // 残り夏回数の状態

  const calculateRemainingDays = (year: number, month: number, day: number) => {
    const birthDate = new Date(year, month - 1, day);
    const eightyYearsLater = new Date(birthDate);
    eightyYearsLater.setFullYear(birthDate.getFullYear() + 80);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);
    eightyYearsLater.setHours(0, 0, 0, 0);

    if (today < birthDate || today >= eightyYearsLater) {
      return 0;
    }

    const diffTime = eightyYearsLater.getTime() - today.getTime();
    const daysLeft = diffTime / (1000 * 60 * 60 * 24);

    return Math.round(daysLeft);
  };

  const calculateRemainingWeekends = (daysLeft: number) => {
    const weekendsLeft = Math.floor(daysLeft / 7);
    const remainingDaysInWeek = daysLeft % 7;
    if (remainingDaysInWeek >= 6) {
      return weekendsLeft + 2;
    } else if (remainingDaysInWeek >= 5) {
      return weekendsLeft + 1;
    }
    return weekendsLeft;
  };

  const calculateRemainingSummers = (daysLeft: number) => {
    const yearsLeft = Math.floor(daysLeft / 365); // 残り年数を計算
    return yearsLeft; // 残り年数がそのまま夏の回数としてカウントされる
  };

  useEffect(() => {
    const daysLeft = calculateRemainingDays(birthYear, birthMonth, birthDay);
    setRemainingDays(daysLeft);

    const totalDays = lifeExpectancy * 365; // ざっくり365日ベース
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    setProgressPercentage(parseFloat(progress.toFixed(2)));

    const weekendsLeft = calculateRemainingWeekends(daysLeft);
    setRemainingWeekends(weekendsLeft);

    const summersLeft = calculateRemainingSummers(daysLeft);
    setRemainingSummers(summersLeft);

    const remainingMeals = remainingDays * mealCountPerDay;
    setRemainingMeals(remainingMeals);
  }, [birthYear, birthMonth, birthDay, mealCountPerDay, remainingDays]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          あなたの残り時間
        </h1>

        <div className="mb-6 text-center">
          <label htmlFor="birthYear" className="text-xl font-semibold text-gray-700">
            生年月日を選択
          </label>
          <div className="mt-2 flex justify-center space-x-4">
            <select
              id="birthYear"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="p-3 border-2 border-gray-300 rounded-md text-black"
            >
              {[...Array(100)].map((_, index) => {
                const year = 2025 - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <select
              id="birthMonth"
              value={birthMonth}
              onChange={(e) => setBirthMonth(Number(e.target.value))}
              className="p-3 border-2 border-gray-300 rounded-md text-black"
            >
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <select
              id="birthDay"
              value={birthDay}
              onChange={(e) => setBirthDay(Number(e.target.value))}
              className="p-3 border-2 border-gray-300 rounded-md text-black"
            >
              {[...Array(31)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 text-center">
          <label htmlFor="mealCount" className="text-xl font-semibold text-gray-700">
            1日の食事回数を選択
          </label>
          <div className="mt-2">
            <select
              id="mealCount"
              value={mealCountPerDay}
              onChange={(e) => setMealCountPerDay(Number(e.target.value))}
              className="p-3 border-2 border-gray-300 rounded-md text-black mx-auto"
            >
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8 text-center text-xl text-gray-600">
          80歳まで生きるとしたら...
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-300 to-teal-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">📅 残り日数</h2>
            <p className="text-4xl font-bold">{remainingDays} 日</p>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-sm font-medium text-teal-800">残り</span>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="w-full bg-teal-200 rounded-full h-2.5">
                    <div
                      className="bg-teal-600 h-2.5 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">🍽️ 残り食事回数</h2>
            <p className="text-4xl font-bold">{remainingMeals} 回</p>
          </div>

          <div className="bg-gradient-to-r from-green-300 to-green-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">🛋️ 残り週末回数</h2>
            <p className="text-4xl font-bold">{remainingWeekends} 回</p>
          </div>

          <div className="bg-gradient-to-r from-orange-300 to-orange-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">🏖️ 残り夏が来る回数</h2>
            <p className="text-4xl font-bold">{remainingSummers} 回</p>
          </div>

          <div className="mt-12 text-center text-lg font-semibold text-gray-700">
            <p>⏳ 時間を大切にしてください。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
