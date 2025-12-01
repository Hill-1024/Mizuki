// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
    id: number;
    content: string;
    date: string;
    images?: string[];
    location?: string;
    mood?: string;
    tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
    {
        id: 1,
        content:
            "好无聊的一天",
        date: "2025-10-13T17:55:26Z",
        images: ["/images/diary/boring.webp"],
    },
    {
        id: 2,
        content: "归家,然后去找高中动漫社小登",
        date: "2025-11-07T15:25:00Z",//07T15.25
        images: ["/images/diary/mutsumiMoe.avif"],
    },
    {
        id: 3,
        content: "小冷的天气",
        date: "2025-11-20T10:37:00Z",
        images: ["/images/diary/cold.jpg"],
    },
    {
        id: 4,
        content: "acm新生选拔赛决赛快到了,好紧张",
        date: "2025-11-26T15:02:00Z",
        images: ["/images/diary/sakura.jpg"],
    },
];
/*

 */
// 获取日记统计数据
export const getDiaryStats = () => {
    const total = diaryData.length;
    const hasImages = diaryData.filter(
        (item) => item.images && item.images.length > 0,
    ).length;
    const hasLocation = diaryData.filter((item) => item.location).length;
    const hasMood = diaryData.filter((item) => item.mood).length;

    return {
        total,
        hasImages,
        hasLocation,
        hasMood,
        imagePercentage: Math.round((hasImages / total) * 100),
        locationPercentage: Math.round((hasLocation / total) * 100),
        moodPercentage: Math.round((hasMood / total) * 100),
    };
};

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
    const sortedData = diaryData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    if (limit && limit > 0) {
        return sortedData.slice(0, limit);
    }

    return sortedData;
};

// 获取最新的日记
export const getLatestDiary = () => {
    return getDiaryList(1)[0];
};

// 根据ID获取日记
export const getDiaryById = (id: number) => {
    return diaryData.find((item) => item.id === id);
};

// 获取包含图片的日记
export const getDiaryWithImages = () => {
    return diaryData.filter((item) => item.images && item.images.length > 0);
};

// 根据标签筛选日记
export const getDiaryByTag = (tag: string) => {
    return diaryData
        .filter((item) => item.tags?.includes(tag))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 获取所有标签
export const getAllTags = () => {
    const tags = new Set<string>();
    diaryData.forEach((item) => {
        if (item.tags) {
            item.tags.forEach((tag) => tags.add(tag));
        }
    });
    return Array.from(tags).sort();
};

export default diaryData;
