import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface BoardItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'story' | 'bug' | 'task' | 'epic';
  assignee?: string;
  storyPoints?: number;
  status: 'backlog' | 'sprint' | 'in-progress' | 'review' | 'done';
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardColumn {
  id: string;
  title: string;
  items: BoardItem[];
  color: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class BoardComponent implements OnInit {
  columns: BoardColumn[] = [];
  showCreateForm = false;
  newItem: Partial<BoardItem> = {};
  selectedColumn = 'sprint';

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard(): void {
    const mockItems: BoardItem[] = [
      {
        id: '1',
        title: 'Implement user authentication',
        description: 'Create login and registration system with JWT tokens',
        priority: 'high',
        type: 'story',
        assignee: 'John Doe',
        storyPoints: 8,
        status: 'sprint',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Fix navigation bug on mobile',
        description: 'Navigation menu not working properly on mobile devices',
        priority: 'critical',
        type: 'bug',
        assignee: 'Jane Smith',
        storyPoints: 3,
        status: 'in-progress',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-16'),
      },
      {
        id: '3',
        title: 'Design dashboard layout',
        description:
          'Create responsive dashboard design with modern UI components',
        priority: 'medium',
        type: 'task',
        assignee: 'Mike Johnson',
        storyPoints: 5,
        status: 'review',
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-17'),
      },
      {
        id: '4',
        title: 'Database optimization',
        description: 'Optimize database queries and add proper indexing',
        priority: 'high',
        type: 'epic',
        assignee: 'Sarah Wilson',
        storyPoints: 13,
        status: 'backlog',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12'),
      },
      {
        id: '5',
        title: 'Add file upload functionality',
        description: 'Implement drag and drop file upload with progress bar',
        priority: 'medium',
        type: 'story',
        assignee: 'Tom Brown',
        storyPoints: 6,
        status: 'done',
        createdAt: new Date('2024-01-11'),
        updatedAt: new Date('2024-01-11'),
      },
    ];

    this.columns = [
      {
        id: 'backlog',
        title: 'Backlog',
        items: mockItems.filter((item) => item.status === 'backlog'),
        color: 'bg-slate-100',
      },
      {
        id: 'sprint',
        title: 'Sprint',
        items: mockItems.filter((item) => item.status === 'sprint'),
        color: 'bg-blue-100',
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        items: mockItems.filter((item) => item.status === 'in-progress'),
        color: 'bg-yellow-100',
      },
      {
        id: 'review',
        title: 'Review',
        items: mockItems.filter((item) => item.status === 'review'),
        color: 'bg-purple-100',
      },
      {
        id: 'done',
        title: 'Done',
        items: mockItems.filter((item) => item.status === 'done'),
        color: 'bg-green-100',
      },
    ];
  }

  getConnectedLists(): string[] {
    return this.columns.map((col) => col.id);
  }

  onDrop(event: CdkDragDrop<BoardItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the status of the moved item
      const movedItem = event.container.data[event.currentIndex];
      movedItem.status = event.container.id as any;
      movedItem.updatedAt = new Date();
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'story':
        return 'bg-blue-100 text-blue-800';
      case 'bug':
        return 'bg-red-100 text-red-800';
      case 'task':
        return 'bg-purple-100 text-purple-800';
      case 'epic':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  createItem(): void {
    if (this.newItem.title && this.newItem.description) {
      const item: BoardItem = {
        id: Date.now().toString(),
        title: this.newItem.title!,
        description: this.newItem.description!,
        priority: this.newItem.priority || 'medium',
        type: this.newItem.type || 'task',
        status: this.selectedColumn as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const column = this.columns.find((col) => col.id === this.selectedColumn);
      if (column) {
        column.items.unshift(item);
      }

      this.resetForm();
    }
  }

  resetForm(): void {
    this.newItem = {};
    this.showCreateForm = false;
    this.selectedColumn = 'sprint';
  }

  deleteItem(item: BoardItem, column: BoardColumn): void {
    const index = column.items.findIndex((i) => i.id === item.id);
    if (index > -1) {
      column.items.splice(index, 1);
    }
  }

  getColumnCount(column: BoardColumn): number {
    return column.items.length;
  }

  getColumnTotalPoints(column: BoardColumn): number {
    return column.items.reduce(
      (total, item) => total + (item.storyPoints || 0),
      0
    );
  }
}
