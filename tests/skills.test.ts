import { expect, test, describe } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { parse } from "yaml";

describe("Agent Skills Infrastructure", () => {
  test(".gemini/skills directory should exist", () => {
    expect(existsSync(".gemini/skills")).toBe(true);
  });

  describe("thinking-partner skill", () => {
    const skillPath = ".gemini/skills/thinking-partner/SKILL.md";

    test("SKILL.md should exist", () => {
      expect(existsSync(skillPath)).toBe(true);
    });

    test("SKILL.md should have valid frontmatter", () => {
      const content = readFileSync(skillPath, "utf-8");
      const parts = content.split("---");
      expect(parts.length).toBeGreaterThanOrEqual(3);
      
      const frontmatter = parse(parts[1]);
      expect(frontmatter.name).toBe("thinking-partner");
      expect(frontmatter.description).toBeDefined();
    });
  });

  const kmSkills = ["daily-review", "weekly-synthesis", "inbox-processor", "research-assistant", "add-frontmatter"];
  kmSkills.forEach(skill => {
    describe(`${skill} skill`, () => {
      const skillPath = `.gemini/skills/${skill}/SKILL.md`;

      test("SKILL.md should exist", () => {
        expect(existsSync(skillPath)).toBe(true);
      });

      test("SKILL.md should have valid frontmatter", () => {
        const content = readFileSync(skillPath, "utf-8");
        const parts = content.split("---");
        expect(parts.length).toBeGreaterThanOrEqual(3);
        
        const frontmatter = parse(parts[1]);
        expect(frontmatter.name).toBe(skill);
        expect(frontmatter.description).toBeDefined();
      });
    });
  });
});
