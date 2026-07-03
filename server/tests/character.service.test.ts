import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Redis
vi.mock("../src/config/redis", () => ({
  redis: {
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn().mockResolvedValue("OK"),
    keys: vi.fn().mockResolvedValue([]),
    del: vi.fn().mockResolvedValue(0),
    connect: vi.fn().mockResolvedValue(undefined),
    on: vi.fn(),
  },
}));

const mockFindAll = vi.fn();
vi.mock("../src/models", () => ({
  sequelize: { authenticate: vi.fn() },
  Character: {
    findAll: (...args: any[]) => mockFindAll(...args),
    hasMany: vi.fn(),
    hasOne: vi.fn(),
  },
  Comment: { belongsTo: vi.fn() },
  Favorite: { belongsTo: vi.fn() },
}));

vi.mock("../src/models/character.model", () => ({
  Character: {
    findAll: (...args: any[]) => mockFindAll(...args),
    hasMany: vi.fn(),
    hasOne: vi.fn(),
  },
}));

vi.mock("../src/models/comment.model", () => ({
  Comment: { belongsTo: vi.fn() },
}));

vi.mock("../src/models/favorite.model", () => ({
  Favorite: { belongsTo: vi.fn() },
}));

import { CharacterService } from "../src/services/character.service";

describe("CharacterService", () => {
  let service: CharacterService;

  beforeEach(() => {
    service = new CharacterService();
    vi.clearAllMocks();
  });

  it("should return all characters when no filters are provided", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: "Earth",
        location: "Earth",
        image: "url",
        type: "",
        created: "2017-11-04",
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: "Earth",
        location: "Earth",
        image: "url",
        type: "",
        created: "2017-11-04",
      },
    ];
    mockFindAll.mockResolvedValue(mockCharacters);

    const result = await service.searchCharacters({});

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Rick Sanchez");
  });

  it("should filter characters by status", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: "Earth",
        location: "Earth",
        image: "url",
        type: "",
        created: "2017-11-04",
      },
    ];
    mockFindAll.mockResolvedValue(mockCharacters);

    const result = await service.searchCharacters({ status: "Alive" });

    expect(result).toHaveLength(1);
    expect(mockFindAll).toHaveBeenCalled();
  });

  it("should filter characters by name (partial match)", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: "Earth",
        location: "Earth",
        image: "url",
        type: "",
        created: "2017-11-04",
      },
    ];
    mockFindAll.mockResolvedValue(mockCharacters);

    const result = await service.searchCharacters({ name: "Rick" });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rick Sanchez");
  });

  it("should filter by multiple fields simultaneously", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: "Earth (C-137)",
        location: "Earth",
        image: "url",
        type: "",
        created: "2017-11-04",
      },
    ];
    mockFindAll.mockResolvedValue(mockCharacters);

    const result = await service.searchCharacters({
      status: "Alive",
      species: "Human",
      gender: "Male",
    });

    expect(result).toHaveLength(1);
    expect(mockFindAll).toHaveBeenCalled();
  });

  it("should return empty array when no characters match", async () => {
    mockFindAll.mockResolvedValue([]);

    const result = await service.searchCharacters({ name: "NonExistent" });

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("should use cached data when available", async () => {
    const { redis } = await import("../src/config/redis");
    const cachedData = [{ id: 1, name: "Rick Sanchez" }];
    (redis.get as any).mockResolvedValueOnce(JSON.stringify(cachedData));

    const result = await service.searchCharacters({ name: "Rick" });

    expect(result).toEqual(cachedData);
    expect(mockFindAll).not.toHaveBeenCalled();
  });
});
