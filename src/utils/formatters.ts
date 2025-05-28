/**
 * Format a date string to a more readable format
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate time remaining until a date
 */
export const timeUntil = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  const targetDate = new Date(dateString);
  const currentDate = new Date();
  
  // Calculate difference in days
  const diffTime = targetDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days overdue`;
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
};

/**
 * Get status color class based on asset status
 */
export const getStatusColorClass = (status: string): string => {
  switch (status) {
    case 'operational':
      return 'bg-green-500';
    case 'maintenance':
      return 'bg-amber-500';
    case 'damaged':
      return 'bg-orange-600';
    case 'decommissioned':
      return 'bg-gray-500';
    case 'deployed':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
};

/**
 * Get condition color class based on asset condition
 */
export const getConditionColorClass = (condition: string): string => {
  switch (condition) {
    case 'excellent':
      return 'text-green-600';
    case 'good':
      return 'text-teal-600';
    case 'fair':
      return 'text-amber-600';
    case 'poor':
      return 'text-orange-600';
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Truncate text with ellipsis if it exceeds the max length
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};