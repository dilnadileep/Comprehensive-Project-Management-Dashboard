import { Component } from '@angular/core';
import { OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  tasks: any[] = [];
  projects: any[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Fetch tasks and projects
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.projectService.getProjects().subscribe((projects) => {
        this.projects = projects;
        this.createChart(); // Generate chart after data is loaded
      });
    });
  }

  private createChart(): void {
    const completedTasksByProject = this.getCompletedTasksByProject();

    // Chart dimensions and margins
    const margin = { top: 20, right: 30, bottom:60, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scaleBand()
      .domain(completedTasksByProject.map((d) => d.projectName))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(completedTasksByProject, (d) => d.taskCount)!])
      .nice()
      .range([height, 0]);

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    svg.append('g').call(d3.axisLeft(y));

    // Add bars
    svg
      .selectAll('.bar')
      .data(completedTasksByProject)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.projectName)!)
      .attr('y', (d) => y(d.taskCount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.taskCount))
      .attr('fill', '#69b3a2');
  }

  private getCompletedTasksByProject(): { projectName: string; taskCount: number }[] {
    const completedTasks = this.tasks.filter((task) => task.status === 'Completed');
    const projectTaskCounts: { [key: number]: number } = {};

    completedTasks.forEach((task) => {
      projectTaskCounts[task.projectId] = (projectTaskCounts[task.projectId] || 0) + 1;
    });

    return this.projects.map((project) => ({
      projectName: project.name,
      taskCount: projectTaskCounts[project.id] || 0,
    }));
  }
}

