import {
  users,
  articles,
  posts,
  interactions,
  follows,
  notifications,
  trends,
  type User,
  type UpsertUser,
  type Article,
  type InsertArticle,
  type Post,
  type InsertPost,
  type Interaction,
  type InsertInteraction,
  type Follow,
  type InsertFollow,
  type Notification,
  type InsertNotification,
  type Trend,
} from "@shared/schema";
import { randomUUID } from "crypto";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  updateUserProfile(id: string, updates: Partial<User>): Promise<User>;

  // Article operations
  getArticles(limit?: number, offset?: number): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticleStats(id: string, stats: Partial<Pick<Article, 'likeCount' | 'repostCount' | 'replyCount' | 'bookmarkCount' | 'viewCount'>>): Promise<void>;

  // Post operations
  getPosts(limit?: number, offset?: number): Promise<(Post & { user: User })[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  getPostsByUser(userId: string, limit?: number): Promise<Post[]>;
  getReplies(postId: string): Promise<(Post & { user: User })[]>;

  // Social interactions
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  removeInteraction(userId: string, targetId: string, type: string): Promise<void>;
  getUserInteraction(userId: string, targetId: string, type: string): Promise<Interaction | undefined>;

  // Follow operations
  followUser(followerId: string, followingId: string): Promise<Follow>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<User[]>;
  getFollowing(userId: string): Promise<User[]>;

  // Notifications
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string, limit?: number): Promise<Notification[]>;
  markNotificationRead(id: string): Promise<void>;

  // Trends
  getTrends(limit?: number): Promise<Trend[]>;
  updateTrend(topic: string, increment: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private articles: Map<string, Article>;
  private posts: Map<string, Post>;
  private interactions: Map<string, Interaction>;
  private follows: Map<string, Follow>;
  private notifications: Map<string, Notification>;
  private trends: Map<string, Trend>;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.posts = new Map();
    this.interactions = new Map();
    this.follows = new Map();
    this.notifications = new Map();
    this.trends = new Map();

    // Initialize with some mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock articles
    const mockArticles: Article[] = [
      {
        id: "1",
        title: "Neuro-Link Interface Achieves 98% Accuracy in Neural Pattern Decoding",
        summary: "A landmark study in neurotechnology has demonstrated a new brain-computer interface capable of decoding complex thought patterns into text with near-perfect accuracy. This breakthrough promises to restore communication for individuals with severe speech impairments.",
        content: "Complete research details on neural pattern recognition and the hardware architecture used in the Sycamore processor tests...",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
        sources: ["Nature Neuro", "TechPulse"],
        category: "Technology",
        tags: ["BCI", "Neural Link", "BioTech"],
        likeCount: 542,
        repostCount: 89,
        replyCount: 24,
        bookmarkCount: 112,
        viewCount: 4500,
        isBreaking: true,
        publishedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: "2",
        title: "Global Supply Chains Rebalance as 'Friend-Shoring' Momentum Accelerates",
        summary: "Major economies are increasingly prioritizing supply chain resilience over cost optimization. A collective shift toward manufacturing within allied nations is redefining trade routes and geopolitical alliances for the next decade.",
        content: "Analysis of trade flow data and corporate procurement strategy shifts among Fortune 500 companies...",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        sources: ["Global Finance", "Reuters"],
        category: "Economy",
        tags: ["Trade", "Supply Chain", "Globalism"],
        likeCount: 231,
        repostCount: 56,
        replyCount: 15,
        bookmarkCount: 88,
        viewCount: 2100,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
      {
        id: "3",
        title: "Vertical Carbon Farming: The Solution to Urban Food Security Challenges",
        summary: "New zero-emission vertical farms are integrating carbon capture technology to produce high-yield crops while actively removing CO2 from the atmosphere. These facilities are now being deployed in dense metropolitan centers.",
        content: "Technical breakdown of the closed-loop irrigation and atmospheric management systems used in the New York pilot project...",
        imageUrl: "https://images.unsplash.com/photo-1530836361253-efad5cb2fe21?w=800&h=600&fit=crop",
        sources: ["Green Journal", "EcoDigest"],
        category: "Climate",
        tags: ["Sustainable", "AgriTech", "Carbon Capture"],
        likeCount: 864,
        repostCount: 142,
        replyCount: 67,
        bookmarkCount: 310,
        viewCount: 8900,
        isBreaking: false,
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        id: "4",
        title: "Mars Habitat Blueprint Finalized for First Human Settlement Project",
        summary: "Space agencies have reached a consensus on the structural design and life support systems for the first self-sustaining Martian colony. Construction of Earth-based prototypes is scheduled to begin early next year.",
        content: "Material science innovations used for radiation shielding and resource recycling systems in extraterrestrial environments...",
        imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
        sources: ["Space Science", "Astro Hub"],
        category: "Science",
        tags: ["Mars", "Astronomy", "Exploration"],
        likeCount: 1240,
        repostCount: 345,
        replyCount: 128,
        bookmarkCount: 560,
        viewCount: 15400,
        isBreaking: true,
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ];

    mockArticles.forEach(article => this.articles.set(article.id, article));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id!);
    const user: User = {
      id: userData.id!,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      username: existingUser?.username || null,
      bio: existingUser?.bio || null,
      isVerified: existingUser?.isVerified || false,
      followerCount: existingUser?.followerCount || 0,
      followingCount: existingUser?.followingCount || 0,
      createdAt: existingUser?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async updateUserProfile(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");

    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Article operations
  async getArticles(limit = 20, offset = 0): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0))
      .slice(offset, offset + limit);
    return articles;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(articleData: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      id,
      title: articleData.title,
      summary: articleData.summary,
      content: articleData.content || null,
      imageUrl: articleData.imageUrl || null,
      sources: articleData.sources || null,
      category: articleData.category,
      tags: articleData.tags || null,
      likeCount: 0,
      repostCount: 0,
      replyCount: 0,
      bookmarkCount: 0,
      viewCount: 0,
      isBreaking: false,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticleStats(id: string, stats: Partial<Pick<Article, 'likeCount' | 'repostCount' | 'replyCount' | 'bookmarkCount' | 'viewCount'>>): Promise<void> {
    const article = this.articles.get(id);
    if (article) {
      this.articles.set(id, { ...article, ...stats });
    }
  }

  // Post operations
  async getPosts(limit = 20, offset = 0): Promise<(Post & { user: User })[]> {
    const posts = Array.from(this.posts.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(offset, offset + limit);

    return posts.map(post => {
      const user = this.users.get(post.userId);
      return { ...post, user: user! };
    }).filter(p => p.user); // Filter out posts without users
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(postData: InsertPost): Promise<Post> {
    const id = randomUUID();
    const post: Post = {
      id,
      userId: postData.userId,
      content: postData.content,
      imageUrl: postData.imageUrl || null,
      articleId: postData.articleId || null,
      parentPostId: postData.parentPostId || null,
      type: postData.type,
      likeCount: 0,
      repostCount: 0,
      replyCount: 0,
      bookmarkCount: 0,
      createdAt: new Date(),
    };
    this.posts.set(id, post);
    return post;
  }

  async getPostsByUser(userId: string, limit = 20): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
  }

  async getReplies(postId: string): Promise<(Post & { user: User })[]> {
    const replies = Array.from(this.posts.values())
      .filter(post => post.parentPostId === postId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

    return replies.map(post => {
      const user = this.users.get(post.userId);
      return { ...post, user: user! };
    }).filter(p => p.user);
  }

  // Social interactions
  async createInteraction(interactionData: InsertInteraction): Promise<Interaction> {
    const id = randomUUID();
    const interaction: Interaction = {
      ...interactionData,
      id,
      createdAt: new Date(),
    };
    this.interactions.set(id, interaction);
    return interaction;
  }

  async removeInteraction(userId: string, targetId: string, type: string): Promise<void> {
    for (const [id, interaction] of this.interactions.entries()) {
      if (interaction.userId === userId && interaction.targetId === targetId && interaction.type === type) {
        this.interactions.delete(id);
        break;
      }
    }
  }

  async getUserInteraction(userId: string, targetId: string, type: string): Promise<Interaction | undefined> {
    return Array.from(this.interactions.values())
      .find(i => i.userId === userId && i.targetId === targetId && i.type === type);
  }

  // Follow operations
  async followUser(followerId: string, followingId: string): Promise<Follow> {
    const id = randomUUID();
    const follow: Follow = {
      id,
      followerId,
      followingId,
      createdAt: new Date(),
    };
    this.follows.set(id, follow);
    return follow;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    for (const [id, follow] of this.follows.entries()) {
      if (follow.followerId === followerId && follow.followingId === followingId) {
        this.follows.delete(id);
        break;
      }
    }
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    return Array.from(this.follows.values())
      .some(f => f.followerId === followerId && f.followingId === followingId);
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followerIds = Array.from(this.follows.values())
      .filter(f => f.followingId === userId)
      .map(f => f.followerId);

    return followerIds.map(id => this.users.get(id)).filter(Boolean) as User[];
  }

  async getFollowing(userId: string): Promise<User[]> {
    const followingIds = Array.from(this.follows.values())
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);

    return followingIds.map(id => this.users.get(id)).filter(Boolean) as User[];
  }

  // Notifications
  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      id,
      userId: notificationData.userId,
      fromUserId: notificationData.fromUserId || null,
      type: notificationData.type,
      targetId: notificationData.targetId || null,
      targetType: notificationData.targetType || null,
      message: notificationData.message,
      isRead: false,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async getUserNotifications(userId: string, limit = 20): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
  }

  async markNotificationRead(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      this.notifications.set(id, { ...notification, isRead: true });
    }
  }

  // Trends
  async getTrends(limit = 10): Promise<Trend[]> {
    return Array.from(this.trends.values())
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, limit);
  }

  async updateTrend(topic: string, increment: number): Promise<void> {
    const existingTrend = Array.from(this.trends.values()).find(t => t.topic === topic);

    if (existingTrend) {
      const updated = {
        ...existingTrend,
        mentionCount: (existingTrend.mentionCount || 0) + increment,
        score: (existingTrend.score || 0) + increment,
        updatedAt: new Date(),
      };
      this.trends.set(existingTrend.id, updated);
    } else {
      const id = randomUUID();
      const trend: Trend = {
        id,
        topic,
        category: null,
        mentionCount: increment,
        score: increment,
        isRising: true,
        updatedAt: new Date(),
      };
      this.trends.set(id, trend);
    }
  }
}

export const storage = new MemStorage();
