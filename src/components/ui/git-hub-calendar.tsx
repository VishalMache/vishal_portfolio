"use client";

import { useState, useEffect } from "react";
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";

interface ContributionDay {
  date: string; // ISO date string (e.g., "2025-09-13")
  count: number;
}

interface GitHubCalendarProps {
  data?: ContributionDay[]; // Contribution data fallback
  username?: string; // Fetch live data if provided
  colors?: string[]; // Custom color scale (default: GitHub-like greens)
}

const GitHubCalendar = ({ data, username, colors = ["var(--color-bg-alt)", "#9be9a8", "#40c463", "#30a14e", "#216e39"] }: GitHubCalendarProps) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [mounted, setMounted] = useState(false);
  const today = new Date();
  const startDate = subDays(today, 364); // One year back
  const weeks = 53;
  const daysInWeek = 7;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Process data prop or fetch live data
  useEffect(() => {
    if (username) {
      fetch(`https://github-contributions-api.deno.dev/${username}.json`)
        .then(res => res.json())
        .then(jsonData => {
          if (jsonData && jsonData.contributions) {
            const flatData = jsonData.contributions.flat().map((item: any) => ({
              date: String(item.date),
              count: Number(item.contributionCount)
            }));
            setContributions(flatData);
          }
        })
        .catch(err => console.error("Failed to fetch GitHub data:", err));
    } else if (data) {
      setContributions(data);
    }
  }, [data, username]);

  // Get color based on contribution count
  const getColor = (count: number) => {
    if (count === 0) return colors[0];
    if (count === 1) return colors[1];
    if (count === 2) return colors[2];
    if (count === 3) return colors[3];
    return colors[4] || colors[colors.length - 1]; // Fallback to last color
  };

  // Render weeks
  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={i} className="flex flex-col gap-1">
          {weekDays.map((day, index) => {
            const contribution = contributions.find((c) => isSameDay(new Date(c.date), day));
            const color = contribution ? getColor(contribution.count) : colors[0];

            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-[4px]`}
                style={{ backgroundColor: color }}
                title={`${format(day, "PPP")}: ${contribution?.count || 0} contributions`}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  // Render month labels
  const renderMonthLabels = () => {
    const months = [];
    let currentMonth = startDate;
    for (let i = 0; i < 12; i++) {
      months.push(
        <span key={i} className="text-[10px] text-text-tertiary font-medium">
          {format(currentMonth, "MMM")}
        </span>
      );
      currentMonth = addDays(currentMonth, 30);
    }
    return months;
  };

  // Render day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!mounted) return null; // Avoid hydration mismatch with date calculations

  return (
    <div className="p-6 border border-border/50 rounded-2xl bg-surface/50 backdrop-blur-sm w-full overflow-x-auto shadow-sm">
      <div className="flex">
        <div className="flex flex-col justify-between mt-5 mr-3">
          {dayLabels.map((day, index) => (
            <span key={index} className="text-[10px] text-text-tertiary font-medium h-3 leading-3">
              {index % 2 === 1 ? day : ""}
            </span>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto pb-3 github-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(150, 150, 150, 0.2) transparent' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .github-scrollbar::-webkit-scrollbar {
              height: 6px;
            }
            .github-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .github-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgba(150, 150, 150, 0.2);
              border-radius: 10px;
            }
            .github-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: var(--color-accent-skin);
            }
          `}} />
          <div className="flex w-full justify-between gap-4 mb-2 min-w-[700px] px-1">{renderMonthLabels()}</div>
          <div className="flex gap-1 min-w-[700px]">{renderWeeks()}</div>
        </div>
      </div>
      <div className="mt-6 justify-end flex gap-2 text-[10px] items-center text-text-tertiary font-medium">
        <span>Less</span>
        {colors.map((color, index) => (
          <div key={index} className="w-3 h-3 rounded-[4px]" style={{ backgroundColor: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export { GitHubCalendar };
