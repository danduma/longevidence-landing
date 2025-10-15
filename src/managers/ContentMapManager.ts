import { BaseManager } from './BaseManager';
import { LandingContentManager, type ContentMapCategory } from './LandingContentManager';

type ContentMapState = {
  activeCategoryId: string;
  categories: ContentMapCategory[];
};

class ContentMapManagerClass extends BaseManager {
  private state: ContentMapState;

  constructor() {
    super();
    const categories = LandingContentManager.getContentMap();
    this.state = {
      activeCategoryId: categories[0]?.id ?? '',
      categories
    };
  }

  getState(): ContentMapState {
    return this.state;
  }

  getActiveCategoryId(): string {
    return this.state.activeCategoryId;
  }

  getActiveCategory(): ContentMapCategory | undefined {
    return this.state.categories.find((category) => category.id === this.state.activeCategoryId) ?? this.state.categories[0];
  }

  getCategories(): ContentMapCategory[] {
    return this.state.categories;
  }

  setActiveCategory(id: string): void {
    if (!id || this.state.activeCategoryId === id) {
      return;
    }

    this.state = {
      ...this.state,
      activeCategoryId: id
    };

    this.emitChange();
  }
}

export const ContentMapManager = new ContentMapManagerClass();
