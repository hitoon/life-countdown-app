'use client';
import { useState } from 'react';

export default function Home() {
  const lifeExpectancy = 80; // 予測寿命を80歳に固定

  // ユーザーの生年月日と年齢を計算
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);

  // 生年月日を基に年齢を計算する関数
  const calculateAge = (year: number, month: number, day: number) => {
    const today = new Date();
    const birth = new Date(year, month - 1, day); // JavaScriptの月は0始まり
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // まだ誕生日が来ていない場合、年齢を1つ引く
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const [currentAge, setCurrentAge] = useState(calculateAge(birthYear, birthMonth, birthDay));

  // 生年月日の変更処理
  const handleDateChange = () => {
    setCurrentAge(calculateAge(birthYear, birthMonth, birthDay));
  };

  // 生年月日の変更時に年齢を再計算
  const handleBirthYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(Number(event.target.value));
    handleDateChange();
  };

  const handleBirthMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(Number(event.target.value));
    handleDateChange();
  };

  const handleBirthDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(Number(event.target.value));
    handleDateChange();
  };

  // 残り日数と食事回数の計算
  const remainingDays = (lifeExpectancy - currentAge) * 365; // 残り日数
  const remainingMeals = remainingDays * 3; // 1日3食を想定

  // パーセンテージの計算
  const progressPercentage = ((currentAge / lifeExpectancy) * 100).toFixed(2);

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
                const year = 2023 - index;
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

        {/* 80歳まで生きるとしたら */}
        <div className="mb-8 text-center text-xl text-gray-600">
          80歳まで生きるとしたら
        </div>

        <div className="space-y-6">
          {/* 残り日数 */}
          <div className="bg-gradient-to-r from-teal-300 to-teal-500 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold">残り日数</h2>
            <p className="text-4xl font-bold">{remainingDays} 日</p>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-sm font-medium text-teal-800">残り時間</span>
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
