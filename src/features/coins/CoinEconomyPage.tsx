import type { FormEvent } from "react";
import { useState } from "react";
import {
  Coins,
  WalletCards,
  Gift,
  Settings2,
  TrendingUp,
  History,
} from "lucide-react";
import Button from "../../components/ui/Button";
import ConfigCard from "./components/ConfigCard";

interface RedemptionRow {
  id: number;
  student: string;
  reward: string;
  coins: number;
  date: string;
  status: "Pending" | "Completed";
}

const RECENT_REDEMPTIONS: RedemptionRow[] = [
  {
    id: 1,
    student: "Sarah Ahmed",
    reward: "Premium Reading Badge",
    coins: 250,
    date: "2024-03-01",
    status: "Completed",
  },
  {
    id: 2,
    student: "Brian Jones",
    reward: "Homework Pass",
    coins: 150,
    date: "2024-02-27",
    status: "Completed",
  },
  {
    id: 3,
    student: "Diana Prince",
    reward: "Classroom Helper Badge",
    coins: 120,
    date: "2024-02-24",
    status: "Pending",
  },
];

const CoinEconomyPage = () => {
  // ------------- FORM STATE (simple local demo) -------------
  const [earningRules, setEarningRules] = useState({
    completionCoins: 10,
    quizCoins: 5,
    challengeCoins: 15,
    dailyLoginCoins: 3,
    globalMultiplier: 1.5,
  });

  const [spendingRules, setSpendingRules] = useState({
    minRedeem: 100,
    badgeCost: 250,
    limitFrequency: "Weekly",
    allowTransfers: true,
  });

  const [eventRewards, setEventRewards] = useState({
    eventName: "Summer Reading Badge",
    description:
      "Students who complete 5 books earn this exclusive badge.",
    rewardType: "Badge",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  });

  const [hybridPricing, setHybridPricing] = useState({
    premiumDeckName: "Premium Deck Collection",
    coinPrice: 500,
    cashPrice: 4.99,
    allowPartialCoins: true,
  });

  // ----------- SUBMIT HANDLERS (stubbed) -----------
  const handleSaveEarningRules = (e: FormEvent) => {
    e.preventDefault();
    console.log("Save earning rules", earningRules);
  };

  const handleSaveSpendingRules = (e: FormEvent) => {
    e.preventDefault();
    console.log("Save spending rules", spendingRules);
  };

  const handleSaveEventRewards = (e: FormEvent) => {
    e.preventDefault();
    console.log("Save event rewards", eventRewards);
  };

  const handleSaveHybridPricing = (e: FormEvent) => {
    e.preventDefault();
    console.log("Save hybrid pricing", hybridPricing);
  };

  // -------------------------------------------------
  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Coin Economy &amp; Rewards Configuration
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Manage the EduManage platform&apos;s internal currency system.
          Set rules for how students earn and spend coins, create engaging
          rewards, and configure hybrid pricing models for premium items.
        </p>
      </div>

      {/* Grid layout – 2 x 3 cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* 1) Coin Earning Rules */}
        <form onSubmit={handleSaveEarningRules}>
          <ConfigCard
            title="Coin Earning Rules"
            subtitle="Define how students earn coins through their activities."
          >
            <div className="space-y-2">
              <label className="block text-[11px] font-medium">
                Coins per Assignment Completion
              </label>
              <input
                type="number"
                value={earningRules.completionCoins}
                onChange={(e) =>
                  setEarningRules((prev) => ({
                    ...prev,
                    completionCoins: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Coins per Quiz Pass
              </label>
              <input
                type="number"
                value={earningRules.quizCoins}
                onChange={(e) =>
                  setEarningRules((prev) => ({
                    ...prev,
                    quizCoins: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Coin per Challenge Participation
              </label>
              <input
                type="number"
                value={earningRules.challengeCoins}
                onChange={(e) =>
                  setEarningRules((prev) => ({
                    ...prev,
                    challengeCoins: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Daily Login Reward (coins)
              </label>
              <input
                type="number"
                value={earningRules.dailyLoginCoins}
                onChange={(e) =>
                  setEarningRules((prev) => ({
                    ...prev,
                    dailyLoginCoins: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              {/* multiplier slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-medium">
                  <span>Global Coin Multiplier</span>
                  <span className="font-semibold">
?{earningRules.globalMultiplier.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={earningRules.globalMultiplier}
                  onChange={(e) =>
                    setEarningRules((prev) => ({
                      ...prev,
                      globalMultiplier: Number(e.target.value),
                    }))
                  }
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-accent/20 accent-brand-accent dark:bg-[#a855f7]/30 dark:accent-brand-purple"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                pill
                className="flex w-full items-center justify-center gap-2 bg-brand-accent dark:bg-[#a855f7] dark:hover:bg-[#9333ea] text-xs font-semibold text-white hover:bg-[#ff8a58] "
              >
                <Coins className="h-4 w-4" />
                Save Earning Rules
              </Button>
            </div>
          </ConfigCard>
        </form>

        {/* 2) Coin Spending & Redemption */}
        <form onSubmit={handleSaveSpendingRules}>
          <ConfigCard
            title="Coin Spending & Redemption"
            subtitle="Set rules for virtual store items and redemption limits."
          >
            <div className="space-y-2">
              <label className="block text-[11px] font-medium">
                Minimum Coins to Redeem
              </label>
              <input
                type="number"
                value={spendingRules.minRedeem}
                onChange={(e) =>
                  setSpendingRules((prev) => ({
                    ...prev,
                    minRedeem: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Premium Badge Base Cost
              </label>
              <input
                type="number"
                value={spendingRules.badgeCost}
                onChange={(e) =>
                  setSpendingRules((prev) => ({
                    ...prev,
                    badgeCost: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Redemption Limit Frequency
              </label>
              <select
                value={spendingRules.limitFrequency}
                onChange={(e) =>
                  setSpendingRules((prev) => ({
                    ...prev,
                    limitFrequency: e.target.value,
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>

              <label className="mt-2 flex items-center gap-2 text-[11px]">
                <input
                  type="checkbox"
                  checked={spendingRules.allowTransfers}
                  onChange={(e) =>
                    setSpendingRules((prev) => ({
                      ...prev,
                      allowTransfers: e.target.checked,
                    }))
                  }
                  className="h-3 w-3 rounded border-slate-300"
                />
                Allow Coin Transfers Between Students
              </label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                pill
                className="flex w-full items-center justify-center gap-2 dark:bg-[#a855f7] dark:hover:bg-[#9333ea] bg-brand-accent text-xs font-semibold text-white hover:bg-[#ff8a58]"
              >
                <WalletCards className="h-4 w-4" />
                Save Spending Rules
              </Button>
            </div>
          </ConfigCard>
        </form>

        {/* 3) Event & Seasonal Rewards */}
        <form onSubmit={handleSaveEventRewards}>
          <ConfigCard
            title="Event & Seasonal Rewards"
            subtitle="Create limited-time rewards for special occasions."
          >
            <div className="space-y-2">
              <label className="block text-[11px] font-medium">
                Event / Campaign Name
              </label>
              <input
                type="text"
                value={eventRewards.eventName}
                onChange={(e) =>
                  setEventRewards((prev) => ({
                    ...prev,
                    eventName: e.target.value,
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Description
              </label>
              <textarea
                rows={3}
                value={eventRewards.description}
                onChange={(e) =>
                  setEventRewards((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Reward Type
              </label>
              <select
                value={eventRewards.rewardType}
                onChange={(e) =>
                  setEventRewards((prev) => ({
                    ...prev,
                    rewardType: e.target.value,
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              >
                <option>Badge</option>
                <option>Bonus Coins</option>
                <option>Exclusive Item</option>
              </select>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={eventRewards.startDate}
                    onChange={(e) =>
                      setEventRewards((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={eventRewards.endDate}
                    onChange={(e) =>
                      setEventRewards((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                pill
                className="flex w-full items-center justify-center gap-2 dark:bg-[#a855f7] dark:hover:bg-[#9333ea] bg-brand-accent text-xs font-semibold text-white hover:bg-[#ff8a58] "
              >
                <Gift className="h-4 w-4" />
                Add New Reward
              </Button>
            </div>
          </ConfigCard>
        </form>

        {/* 4) Hybrid Pricing Configuration */}
        <form onSubmit={handleSaveHybridPricing}>
          <ConfigCard
            title="Hybrid Pricing Configuration"
            subtitle="Configure premium content with coins and/or cash."
          >
            <div className="space-y-2">
              <label className="block text-[11px] font-medium">
                Premium Deck / Collection Name
              </label>
              <input
                type="text"
                value={hybridPricing.premiumDeckName}
                onChange={(e) =>
                  setHybridPricing((prev) => ({
                    ...prev,
                    premiumDeckName: e.target.value,
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Coin Price
              </label>
              <input
                type="number"
                value={hybridPricing.coinPrice}
                onChange={(e) =>
                  setHybridPricing((prev) => ({
                    ...prev,
                    coinPrice: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="block pt-1 text-[11px] font-medium">
                Cash Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={hybridPricing.cashPrice}
                onChange={(e) =>
                  setHybridPricing((prev) => ({
                    ...prev,
                    cashPrice: Number(e.target.value),
                  }))
                }
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs outline-none focus:border-brand-accent dark:border-white/10 dark:bg-white/5"
              />

              <label className="mt-2 flex items-center gap-2 text-[11px]">
                <input
                  type="checkbox"
                  checked={hybridPricing.allowPartialCoins}
                  onChange={(e) =>
                    setHybridPricing((prev) => ({
                      ...prev,
                      allowPartialCoins: e.target.checked,
                    }))
                  }
                  className="h-3 w-3 rounded border-slate-300"
                />
                Enable Partial Coin Payments
              </label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                pill
                className="flex w-full items-center justify-center gap-2 bg-brand-accent text-xs font-semibold text-white hover:bg-[#ff8a58] dark:bg-[#a855f7] dark:hover:bg-[#9333ea]"
              >
                <Settings2 className="h-4 w-4" />
                Configure Items
              </Button>
            </div>
          </ConfigCard>
        </form>

        {/* 5) Coin System Overview */}
        <ConfigCard
          title="Coin System Overview"
          subtitle="Key metrics for the EduManage coin economy."
        >
          <div className="space-y-3 pt-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Total Coins in Circulation
              </span>
              <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
                12,500
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Average Coins per Student
              </span>
              <span className="font-semibold">75</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Active Rewards
              </span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Active Campaigns
              </span>
              <span className="font-semibold">3</span>
            </div>
          </div>

          <div className="pt-4">
            <Button
              pill
              className="flex w-full items-center justify-center gap-2 bg-brand-accent text-xs font-semibold text-white hover:bg-[#ff8a58] dark:bg-[#a855f7] dark:hover:bg-[#9333ea]"
            >
              <TrendingUp className="h-4 w-4" />
              View Coin Reports
            </Button>
          </div>
        </ConfigCard>

        {/* 6) Recent Reward Redemptions */}
        <ConfigCard
          title="Recent Reward Redemptions"
          subtitle="Overview of recent reward redemptions across the platform."
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-[11px] dark:border-white/10 dark:bg-white/5">
            <table className="min-w-full">
              <thead className="bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">
                    Student
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    Reward
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    Coins
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECENT_REDEMPTIONS.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-slate-200 bg-white dark:border-white/5 dark:bg-transparent"
                  >
                    <td className="px-3 py-2">{row.student}</td>
                    <td className="px-3 py-2">{row.reward}</td>
                    <td className="px-3 py-2">{row.coins}</td>
                    <td className="px-3 py-2">{row.date}</td>
                    <td className="px-3 py-2 text-right">
                      {row.status === "Completed" ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-semibold text-amber-600 dark:bg-amber-500/15 dark:text-amber-200">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-end text-[11px] text-slate-500 dark:text-slate-400">
            <History className="mr-1.5 h-3.5 w-3.5" />
            Last 30 days of activity
          </div>
        </ConfigCard>
      </div>
    </section>
  );
};

export default CoinEconomyPage;
