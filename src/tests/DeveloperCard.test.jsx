import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DeveloperCard from '../components/developers/DeveloperCard';

const mockDeveloper = {
  id: '1',
  name: 'TestDev',
  address: '0x1234567890abcdef',
  profilePic: 'https://example.com/pic.jpg',
  totalProjects: 10,
  successfulProjects: 8,
  ruggedProjects: 2,
  bondingRate: 80,
  dumperRating: 7.5
};

describe('DeveloperCard', () => {
  it('renders developer information correctly', () => {
    render(
      <BrowserRouter>
        <DeveloperCard developer={mockDeveloper} />
      </BrowserRouter>
    );
    
    // Check if developer name is displayed
    expect(screen.getByText('TestDev')).toBeInTheDocument();
    
    // Check if key metrics are displayed
    expect(screen.getByText('10')).toBeInTheDocument(); // Total projects
    expect(screen.getByText('80%')).toBeInTheDocument(); // Success rate
    expect(screen.getByText('80%')).toBeInTheDocument(); // Bonding rate
    expect(screen.getByText('20%')).toBeInTheDocument(); // Rug rate
    
    // Check if rating is displayed
    expect(screen.getByText('7.5')).toBeInTheDocument();
    
    // Check if "View Profile" link exists with correct href
    const link = screen.getByText('View Profile');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/developer/1');
  });
});