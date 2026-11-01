import { state } from './store';

export type DashboardSummary = {
  totalProjects: number;
  totalCampaigns: number;
  activeUsers: number;
  revenuePlans: number;
  status: 'healthy';
};

export function getDashboardSummary(): DashboardSummary {
  return {
    totalProjects: state.projects.length,
    totalCampaigns: state.campaigns.length,
    activeUsers: state.users.length,
    revenuePlans: state.revenuePlans.length,
    status: 'healthy',
  };
}
