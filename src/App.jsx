import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Calendar,
  Hash,
  TrendingUp,
  Activity,
  Star,
  Shield,
  Upload,
  Send,
  Home,
  ChevronRight,
  UserCircle,
  Building,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  BookOpen,
  Award,
  CircleDot
} from 'lucide-react';

const ComplaintManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Chinedu Okwu',
    email: 'chinedu.okwu@uniport.edu.ng',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    department: 'Computer Science',
    level: '400 Level',
    matricNo: 'U2020/5570125',
    faculty: 'Faculty of Science',
    address: 'University of Port Harcourt, Choba, Rivers State',
    phone: '+2348012345678'
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Existing state and data
  const [complaints, setComplaints] = useState([
    {
      id: 'CSC/CMP/001',
      title: 'Broken Laboratory Equipment in Engineering Block',
      category: 'Academic',
      priority: 'High',
      status: 'In Progress',
      dateSubmitted: '2024-09-01',
      lastUpdated: '2024-09-03',
      description: 'Several oscilloscopes and multimeters in the Electronics Lab are not functioning properly, affecting practical sessions for final year students.',
      assignedTo: 'Laboratory Technician',
      assignedBy: 'Dr. Emeka (HOD, Computer Science)',
      student: 'Chinedu Okwu',
      department: 'Computer Science',
      estimatedResolution: '2024-09-10',
      updates: [
        { date: '2024-09-03', message: 'Equipment assessment completed, replacement parts ordered', by: 'Lab Technician' },
        { date: '2024-09-02', message: 'Complaint received and forwarded to laboratory unit', by: 'Academic Office' }
      ]
    },
    {
      id: 'CSC/CMP/002',
      title: 'Poor Network Connectivity in Student Hostels',
      category: 'ICT',
      priority: 'Critical',
      status: 'Open',
      dateSubmitted: '2024-09-02',
      lastUpdated: '2024-09-02',
      description: 'Internet connection in the postgraduate hostels has been extremely poor for the past month, affecting online learning and research activities.',
      assignedTo: 'ICT Directorate',
      assignedBy: 'Pending',
      student: 'Chinedu Okwu',
      department: 'Computer Science',
      estimatedResolution: 'TBD',
      updates: [
        { date: '2024-09-02', message: 'Complaint logged, awaiting technical assessment', by: 'System' }
      ]
    },
    {
      id: 'CSC/CMP/003',
      title: 'Inadequate Power Supply in Library',
      category: 'Facilities',
      priority: 'Medium',
      status: 'Resolved',
      dateSubmitted: '2024-08-28',
      lastUpdated: '2024-09-01',
      description: 'Frequent power outages in the main library have been disrupting students\' study sessions and damaging electronic devices.',
      assignedTo: 'Maintenance Department',
      assignedBy: 'Library Director',
      student: 'Chinedu Okwu',
      department: 'Computer Science',
      estimatedResolution: '2024-09-01',
      resolution: 'Additional generator installed and UPS systems upgraded throughout the library.',
      updates: [
        { date: '2024-09-01', message: 'Power infrastructure upgrade completed successfully', by: 'Maintenance Team' },
        { date: '2024-08-30', message: 'Electrical assessment done, upgrade scheduled', by: 'Chief Electrician' },
        { date: '2024-08-29', message: 'Complaint assigned to electrical maintenance unit', by: 'Maintenance Supervisor' }
      ]
    }
  ]);
  
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium'
  });

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    avgResolutionTime: '4.5 days',
    satisfactionRate: '92%'
  };

  const dashboardCards = [
    { title: 'Total Complaints', value: stats.total, icon: FileText, color: 'bg-slate-500' },
    { title: 'Open', value: stats.open, icon: CircleDot, color: 'bg-red-500' },
    { title: 'In Progress', value: stats.inProgress, icon: Activity, color: 'bg-yellow-500' },
    { title: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'bg-green-500' },
  ];
  
  const ComplaintList = ({complaints, onSelectComplaint, showFilter = false}) => {
    // This is a placeholder component for the complaint list
    return (
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">Your Recent Complaints</h3>
          {showFilter && (
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          )}
        </div>
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onSelectComplaint(complaint)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{complaint.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                  complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">{complaint.title}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{complaint.description}</p>
              <div className="mt-2 text-xs text-gray-400">
                <span>Submitted: {complaint.dateSubmitted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const StatCard = ({ title, value, icon: Icon, color, description, trend }) => (
    <div className={`p-6 rounded-2xl text-white shadow-lg ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <Icon className="h-6 w-6 opacity-80" />
      </div>
      <p className="text-4xl font-extrabold">{value}</p>
      <p className="text-sm opacity-90 mt-2">{description}</p>
      {trend && <p className="text-xs opacity-70 mt-1">{trend}</p>}
    </div>
  );
  
  const ComplaintForm = () => {
    // This is a placeholder component for the complaint form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Medium');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const newComplaintData = {
        id: `CSC/CMP/${String(complaints.length + 1).padStart(3, '0')}`,
        title,
        description,
        category,
        priority,
        status: 'Open',
        dateSubmitted: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
        assignedTo: 'Pending',
        assignedBy: 'Pending',
        student: currentUser.name,
        department: currentUser.department,
        estimatedResolution: 'TBD',
        updates: [
          { date: new Date().toISOString().slice(0, 10), message: 'Complaint logged, awaiting assessment', by: 'System' }
        ]
      };
      setComplaints([...complaints, newComplaintData]);
      setActiveTab('complaints'); // Redirect to my complaints
    };
    
    return (
      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Submit a New Complaint</h3>
        <p className="text-gray-600 mb-8">
          Fill out the form below to report an issue. Your complaint will be routed to the appropriate department.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Complaint Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm rounded-xl"
              >
                <option value="">Select a category</option>
                <option value="Academic">Academic</option>
                <option value="Facilities">Facilities</option>
                <option value="ICT">ICT</option>
                <option value="Admin">Admin</option>
                <option value="Security">Security</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm rounded-xl"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Submit Complaint</span>
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl`}>
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center p-1">
            <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-slate-800" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white">CS Complaint System</h1>
            <p className="text-xs text-slate-400">UniPort, Computer Science</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="mt-6 px-3 lg:px-4 space-y-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home, desc: 'Overview & Stats' },
          { id: 'complaints', label: 'My Complaints', icon: FileText, desc: 'Track Your Issues' },
          { id: 'submit', label: 'Submit Complaint', icon: Plus, desc: 'Report New Issue' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Trends & Insights' },
          { id: 'profile', label: 'Profile', icon: UserCircle, desc: 'Account Settings' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full group flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-slate-700 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-medium block truncate">{item.label}</span>
                <span className={`text-xs ${activeTab === item.id ? 'text-slate-300' : 'text-slate-500'} hidden lg:block`}>{item.desc}</span>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${activeTab === item.id ? 'transform rotate-90' : ''} flex-shrink-0`} />
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-3 lg:p-4 border-t border-slate-700 bg-slate-900">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-slate-800 rounded-xl">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-slate-600 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-400 truncate">{currentUser.matricNo}</p>
            <p className="text-xs text-slate-500 capitalize truncate">{currentUser.department}</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-slate-800">
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
              {activeTab === 'profile' ? 'My Profile' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-sm text-gray-600 hidden sm:block">University of Port Harcourt, Computer Science</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search complaints..."
              className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {dashboardCards.map((card) => (
                <StatCard key={card.title} {...card} />
              ))}
            </div>
            <ComplaintList complaints={complaints} onSelectComplaint={() => {}} />
          </div>
        );
      case 'complaints':
        return (
          <div className="space-y-6 lg:space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">My Complaints</h3>
            </div>
            <ComplaintList complaints={complaints} onSelectComplaint={() => {}} showFilter={true} />
          </div>
        );
      case 'submit':
        return <ComplaintForm />;
      case 'analytics':
        return (
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Complaint Analytics</h3>
                <p className="text-gray-600 mt-1">Insights and trends across all complaints in Computer Science</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                    <option>All Time</option>
                  </select>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    <Download className="h-4 w-4" />
                    <span className="text-sm font-medium">Export Report</span>
                  </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <StatCard
                title="Total Complaints"
                value={stats.total}
                icon={FileText}
                color="bg-slate-600"
                description="Overall submissions"
                trend="+8% last month"
              />
              <StatCard
                title="Average Resolution Time"
                value={stats.avgResolutionTime}
                icon={Clock}
                color="bg-purple-600"
                description="Avg. time to resolve"
                trend="-2.1 days (improved)"
              />
              <StatCard
                title="Satisfaction Rate"
                value={stats.satisfactionRate}
                icon={Star}
                color="bg-blue-600"
                description="Student feedback"
                trend="+3% last quarter"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Complaints by Category</h4>
                    <p className="text-gray-600 mb-6">Distribution of issues across different categories.</p>
                    <div className="h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-500 text-sm italic">
                      [Category Distribution Chart Placeholder]
                    </div>
                </div>

                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Complaint Status Over Time</h4>
                    <p className="text-gray-600 mb-6">Trend of open, in-progress, and resolved complaints.</p>
                    <div className="h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-500 text-sm italic">
                      [Status Trend Line Chart Placeholder]
                    </div>
                </div>

                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 xl:col-span-2">
                    <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Top 5 Most Frequent Complaints</h4>
                    <p className="text-gray-600 mb-6">Recurring issues that require attention.</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Count
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Occurred
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Slow Wi-Fi in Lab</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ICT</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-09-15</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Projector Malfunction in Lecture Hall A</td>
                                    <td className="px-6 py-4 whitespace-now-wrap text-sm text-gray-500">Facilities</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-09-10</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inadequate Textbooks in Library</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Academic</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-09-08</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
              <div className="mb-8 lg:mb-10 text-center">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto border-4 border-slate-200 object-cover"
                />
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-4 mb-1">{currentUser.name}</h3>
                <p className="text-lg text-gray-600 capitalize">{currentUser.role}</p>
                <p className="text-md text-gray-500 mt-1">Matric No: {currentUser.matricNo}</p>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <UserCircle className="h-6 w-6 text-slate-600" />
                    <span>Personal Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium text-gray-900">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-medium text-gray-900">{currentUser.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 md:col-span-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">{currentUser.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-slate-600" />
                    <span>Academic Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium text-gray-900">{currentUser.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Faculty</p>
                        <p className="font-medium text-gray-900">{currentUser.faculty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Level</p>
                        <p className="font-medium text-gray-900">{currentUser.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Hash className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Matriculation Number</p>
                        <p className="font-medium text-gray-900">{currentUser.matricNo}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all">
                    Change Password
                  </button>
                  <button className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 font-semibold transition-all shadow-lg flex items-center justify-center space-x-2">
                    <Edit className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-slate-900">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
        <Header />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ComplaintManagementSystem;