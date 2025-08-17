import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'story' | 'bug' | 'task' | 'epic';
  assignee?: string;
  storyPoints?: number;
  status: 'backlog' | 'sprint' | 'in-progress' | 'done';
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BacklogComponent implements OnInit {
  backlogItems: BacklogItem[] = [];
  filteredItems: BacklogItem[] = [];
  searchTerm = '';
  selectedType: string = 'all';
  selectedPriority: string = 'all';
  selectedStatus: string = 'all';
  showCreateForm = false;
  newItem: Partial<BacklogItem> = {};

  ngOnInit(): void {
    this.initializeMockData();
    this.filteredItems = [...this.backlogItems];
  }

  initializeMockData(): void {
    this.backlogItems = [
      {
        id: '1',
        title: 'Implement user authentication',
        description: 'Create login and registration system with JWT tokens',
        priority: 'high',
        type: 'story',
        assignee: 'John Doe',
        storyPoints: 8,
        status: 'backlog',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Fix navigation bug on mobile',
        description: 'Navigation menu not working properly on mobile devices',
        priority: 'critical',
        type: 'bug',
        assignee: 'Jane Smith',
        storyPoints: 3,
        status: 'sprint',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-16')
      },
      {
        id: '3',
        title: 'Design dashboard layout',
        description: 'Create responsive dashboard design with modern UI components',
        priority: 'medium',
        type: 'task',
        assignee: 'Mike Johnson',
        storyPoints: 5,
        status: 'in-progress',
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-17')
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
        updatedAt: new Date('2024-01-12')
      },
      {
        id: '5',
        title: 'Add file upload functionality',
        description: 'Implement drag and drop file upload with progress bar',
        priority: 'medium',
        type: 'story',
        assignee: 'Tom Brown',
        storyPoints: 6,
        status: 'backlog',
        createdAt: new Date('2024-01-11'),
        updatedAt: new Date('2024-01-11')
      }
    ];
  }

  filterItems(): void {
    this.filteredItems = this.backlogItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType === 'all' || item.type === this.selectedType;
      const matchesPriority = this.selectedPriority === 'all' || item.priority === this.selectedPriority;
      const matchesStatus = this.selectedStatus === 'all' || item.status === this.selectedStatus;
      
      return matchesSearch && matchesType && matchesPriority && matchesStatus;
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'story': return 'bg-blue-100 text-blue-800';
      case 'bug': return 'bg-red-100 text-red-800';
      case 'task': return 'bg-purple-100 text-purple-800';
      case 'epic': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'backlog': return 'bg-gray-100 text-gray-800';
      case 'sprint': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  createItem(): void {
    if (this.newItem.title && this.newItem.description) {
      const item: BacklogItem = {
        id: (this.backlogItems.length + 1).toString(),
        title: this.newItem.title!,
        description: this.newItem.description!,
        priority: this.newItem.priority || 'medium',
        type: this.newItem.type || 'task',
        status: 'backlog',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.backlogItems.unshift(item);
      this.filterItems();
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newItem = {};
    this.showCreateForm = false;
  }

  moveToSprint(item: BacklogItem): void {
    item.status = 'sprint';
    item.updatedAt = new Date();
    this.filterItems();
  }

  deleteItem(item: BacklogItem): void {
    const index = this.backlogItems.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.backlogItems.splice(index, 1);
      this.filterItems();
    }
  }
}
