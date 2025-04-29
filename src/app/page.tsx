'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const lifeExpectancy = 80;

  const today = new Date();
  const [birthYear, setBirthYear] = useState<number>(1995);
  const [birthMonth, setBirthMonth] = useState<number>(today.getMonth() + 1);
  const [birthDay, setBirthDay] = useState<number>(today.getDate());

  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [mealCountPerDay, setMealCountPerDay] = useState<number>(3); // 1日の食事回数の状態

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

  // 💡 birthYear/birthMonth/birthDayの変化を監視する
  useEffect(() => {
    const daysLeft = calculateRemainingDays(birthYear, birthMonth, birthDay);
    setRemainingDays(daysLeft);

    const totalDays = lifeExpectancy * 365; // ざっくり365日ベース
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    setProgressPercentage(parseFloat(progress.toFixed(2)));
  }, [birthYear, birthMonth, birthDay]); // ←依存配列！

  const handleBirthYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(Number(event.target.value));
  };

  const handleBirthMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(Number(event.target.value));
  };

  const handleBirthDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(Number(event.target.value));
  };

  // 残り食事回数の計算
  const remainingMeals = remainingDays * mealCountPerDay; // 入力された食事回数を反映

  // 食事回数の変更処理
  const handleMealCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealCountPerDay(Number(event.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          あなたの残りの時間
        </h1>

        {/* 生年月日セレクタ */}
        <div className="mb-6 text-center">
          <label htmlFor="birthYear" className="text-xl font-semibold text-gray-700">
            生年月日を選択してください
          </label>
          <div className="mt-2 flex justify-center space-x-4">
            <select
              id="birthYear"
              value={birthYear}
              onChange={handleBirthYearChange}
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
              onChange={handleBirthMonthChange}
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
              onChange={handleBirthDayChange}
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

        {/* 1日の食事回数 */}
        <div className="mb-6 text-center">
          <label htmlFor="mealCount" className="text-xl font-semibold text-gray-700">
            1日の食事回数を入力してください
          </label>
          <div className="mt-2">
            <input
              id="mealCount"
              type="number"
              value={mealCountPerDay}
              onChange={handleMealCountChange}
              className="p-3 border-2 border-gray-300 rounded-md text-black w-full max-w-xs mx-auto"
              min="1"
            />
          </div>
        </div>

        {/* 80歳まで生きるとしたら */}
        <div className="mb-8 text-center text-xl text-gray-600">
          80歳まで生きるとしたら...
        </div>

        <div className="space-y-6">
          {/* 残り日数 */}
          <div className="bg-gradient-to-r from-teal-300 to-teal-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">残り日数</h2>
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

          {/* 残り食事回数 */}
          <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">残り食事回数</h2>
            <p className="text-4xl font-bold">{remainingMeals} 回</p>
          </div>
        </div>
      </div>
    </div>
  );
}
