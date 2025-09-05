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
  MapPin
} from 'lucide-react';

const ComplaintManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Chinedu Okwu',
    email: 'chinedu.okwu@student.uniport.edu.ng',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    department: 'Computer Engineering',
    level: '400 Level',
    matricNo: 'CPE/2020/1245'
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP001',
      title: 'Broken Laboratory Equipment in Engineering Block',
      category: 'Academic',
      priority: 'High',
      status: 'In Progress',
      dateSubmitted: '2024-09-01',
      lastUpdated: '2024-09-03',
      description: 'Several oscilloscopes and multimeters in the Electronics Lab are not functioning properly, affecting practical sessions for final year students.',
      assignedTo: 'Laboratory Technician',
      assignedBy: 'Dr. Emeka (HOD)',
      student: 'Chinedu Okwu',
      department: 'Computer Engineering',
      estimatedResolution: '2024-09-10',
      updates: [
        { date: '2024-09-03', message: 'Equipment assessment completed, replacement parts ordered', by: 'Lab Technician' },
        { date: '2024-09-02', message: 'Complaint received and forwarded to laboratory unit', by: 'Academic Office' }
      ]
    },
    {
      id: 'CMP002',
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
      department: 'Computer Engineering',
      estimatedResolution: 'TBD',
      updates: [
        { date: '2024-09-02', message: 'Complaint logged, awaiting technical assessment', by: 'System' }
      ]
    },
    {
      id: 'CMP003',
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
      department: 'Computer Engineering',
      estimatedResolution: '2024-09-01',
      resolution: 'Additional generator installed and UPS systems upgraded throughout the library.',
      updates: [
        { date: '2024-09-01', message: 'Power infrastructure upgrade completed successfully', by: 'Maintenance Team' },
        { date: '2024-08-30', message: 'Electrical assessment done, upgrade scheduled', by: 'Chief Electrician' },
        { date: '2024-08-29', message: 'Complaint assigned to electrical maintenance unit', by: 'Maintenance Supervisor' }
      ]
    }
  ]);

  const [stats, setStats] = useState({
    total: 67,
    open: 18,
    inProgress: 25,
    resolved: 24,
    avgResolutionTime: '7.8 days',
    satisfactionRate: '88%'
  });

  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
    department: '',
    location: '',
    evidence: null
  });

  const categories = [
    'Academic', 'Administrative', 'Facilities', 'ICT', 
    'Welfare', 'Financial', 'Security', 'Transport', 'Hostel', 'Medical'
  ];
  
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Open', 'In Progress', 'Under Review', 'Resolved', 'Closed'];

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'bg-blue-600 text-white',
      'In Progress': 'bg-amber-600 text-white',
      'Under Review': 'bg-purple-600 text-white',
      'Resolved': 'bg-green-600 text-white',
      'Closed': 'bg-gray-600 text-white'
    };
    return colors[status] || 'bg-gray-600 text-white';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': 'bg-emerald-100 text-emerald-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const handleSubmitComplaint = () => {
    if (!formData.title || !formData.category || !formData.priority || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newComplaint = {
      id: `CMP${String(complaints.length + 1).padStart(3, '0')}`,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      status: 'Open',
      dateSubmitted: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      description: formData.description,
      assignedTo: 'Pending Assignment',
      assignedBy: 'Pending',
      student: currentUser.name,
      department: formData.department || currentUser.department,
      estimatedResolution: 'TBD',
      updates: [
        { date: new Date().toISOString().split('T')[0], message: 'Complaint submitted successfully', by: 'System' }
      ]
    };
    
    setComplaints([newComplaint, ...complaints]);
    setFormData({ title: '', category: '', priority: '', description: '', department: '', location: '', evidence: null });
    setShowComplaintModal(false);
    setStats(prev => ({ 
      ...prev, 
      total: prev.total + 1, 
      open: prev.open + 1 
    }));
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl`}>
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center">
            {/* UNIPORT LOGO SPACE - Replace this div with <img src="uniport-logo.png" alt="UNIPORT" className="h-6 w-6 lg:h-8 lg:w-8" /> */}
            <div className="text-slate-900 font-bold text-xs lg:text-sm">LOGO</div>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white">CSCS</h1>
            <p className="text-xs text-slate-400">Computer Science Complaints</p>
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
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-sm text-gray-600 hidden sm:block">Department of Computer Science - University of Port Harcourt</p>
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

  const StatCard = ({ title, value, icon: Icon, color, description, trend }) => (
    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 lg:p-3 rounded-xl ${color}`}>
          <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{description}</p>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs ${trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="h-3 w-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  const ComplaintCard = ({ complaint, onView, onViewDetails }) => (
    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-md">#{complaint.id}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
              {complaint.priority}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{complaint.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{complaint.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Submitted: {complaint.dateSubmitted}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Updated: {complaint.lastUpdated}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="truncate">Assigned: {complaint.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span className="truncate">Category: {complaint.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-4 lg:mt-0 lg:ml-4">
          <button
            onClick={() => {
              setSelectedComplaint(complaint);
              setShowDetailsModal(true);
            }}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Edit">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="Message">
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {complaint.category}
          </span>
          <span className="text-xs text-gray-500">{complaint.department}</span>
        </div>
        <button 
          onClick={() => {
            setSelectedComplaint(complaint);
            setShowDetailsModal(true);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-all"
        >
          View Details →
        </button>
      </div>
    </div>
  );

  const ComplaintModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl lg:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 lg:p-8 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Submit New Complaint</h3>
              <p className="text-gray-600 mt-1">Provide detailed information for faster resolution</p>
            </div>
            <button
              onClick={() => setShowComplaintModal(false)}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Complaint Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                placeholder="Brief description of your complaint"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Department</label>
              <input
                type="text"
                value={formData.department || currentUser.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all bg-gray-50"
                placeholder="Your department"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Priority *</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              >
                <option value="">Select priority</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                placeholder="Where did this issue occur?"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Description *</label>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none transition-all"
              placeholder="Provide detailed information about your complaint, including dates, impact, and any relevant context..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Attach Evidence (Optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload images, documents, or other evidence</p>
              <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <button
              onClick={() => setShowComplaintModal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitComplaint}
              className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 font-semibold transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Submit Complaint</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
              <div className="xl:col-span-2">
                <StatCard
                  title="Total Complaints"
                  value={stats.total}
                  icon={FileText}
                  color="bg-slate-600"
                  description="All time submissions"
                  trend="+8% this month"
                />
              </div>
              <div className="xl:col-span-2">
                <StatCard
                  title="Open Cases"
                  value={stats.open}
                  icon={AlertCircle}
                  color="bg-red-600"
                  description="Awaiting assignment"
                  trend="+5 this week"
                />
              </div>
              <div className="xl:col-span-2">
                <StatCard
                  title="In Progress"
                  value={stats.inProgress}
                  icon={Clock}
                  color="bg-amber-600"
                  description="Being processed"
                  trend="-12% resolved"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              <StatCard
                title="Resolved"
                value={stats.resolved}
                icon={CheckCircle}
                color="bg-green-600"
                description="Successfully closed"
                trend="+18% efficiency"
              />
              <StatCard
                title="Avg Resolution"
                value={stats.avgResolutionTime}
                icon={Activity}
                color="bg-purple-600"
                description="Average time to resolve"
                trend="-2.1 days improved"
              />
              <StatCard
                title="Satisfaction Rate"
                value={stats.satisfactionRate}
                icon={Star}
                color="bg-blue-600"
                description="Student feedback rating"
                trend="+3% this quarter"
              />
            </div>
            
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Recent Activity</h3>
                  <p className="text-gray-600 mt-1">Your latest complaint submissions and updates</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filter</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    <Download className="h-4 w-4" />
                    <span className="text-sm font-medium">Export</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                {complaints.slice(0, 3).map((complaint) => (
                  <ComplaintCard 
                    key={complaint.id} 
                    complaint={complaint}
                    onView={setSelectedComplaint}
                    onViewDetails={() => {
                      setSelectedComplaint(complaint);
                      setShowDetailsModal(true);
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center mt-6 lg:mt-8">
                <button 
                  onClick={() => setActiveTab('complaints')}
                  className="px-6 lg:px-8 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 font-semibold transition-all shadow-lg"
                >
                  View All Complaints
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'complaints':
        return (
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">My Complaints</h3>
                <p className="text-gray-600 mt-1">Track and manage your submitted complaints</p>
              </div>
              <button
                onClick={() => setShowComplaintModal(true)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 font-semibold transition-all shadow-lg"
              >
                <Plus className="h-5 w-5" />
                <span>New Complaint</span>
              </button>
            </div>
            
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search your complaints..."
                    className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                <option>All Statuses</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
                <option>All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="grid gap-4 lg:gap-6">
              {complaints.map((complaint) => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint}
                  onView={setSelectedComplaint}
                  onViewDetails={() => {
                    setSelectedComplaint(complaint);
                    setShowDetailsModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        );
        
      case 'submit':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
              <div className="mb-8 lg:mb-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Submit New Complaint</h3>
                <p className="text-gray-600 text-lg">Provide detailed information about your concern for faster resolution</p>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Complaint Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-lg"
                      placeholder="Brief description of your complaint"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Department</label>
                    <input
                      type="text"
                      value={formData.department || currentUser.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all bg-gray-50 text-lg"
                      placeholder="Your department"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-lg"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Priority *</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-lg"
                    >
                      <option value="">Select priority</option>
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-lg"
                      placeholder="Where did this issue occur?"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Description *</label>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none transition-all text-lg"
                    placeholder="Provide detailed information about your complaint, including dates, impact, and any relevant context..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Attach Evidence (Optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-slate-300 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-2">Click to upload images, documents, or other evidence</p>
                    <p className="text-sm text-gray-500">Max file size: 10MB • Supported formats: JPG, PNG, PDF, DOC</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-6 lg:pt-8">
                  <button className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all text-lg">
                    Save Draft
                  </button>
                  <button
                    onClick={handleSubmitComplaint}
                    className="flex-1 px-8 py-4 bg-slate-600 text-white rounded-xl hover:bg-slate-700 font-semibold transition-all shadow-lg flex items-center justify-center space-x-3 text-lg"
                  >
                    <Send className="h-6 w-6" />
                    <span>Submit Complaint</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-12 lg:py-20">
            <div className="text-gray-400 mb-6">
              <FileText className="h-16 w-16 lg:h-20 lg:w-20 mx-auto" />
            </div>
            <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4">Feature Coming Soon</h3>
            <p className="text-gray-600 text-lg">This section is under development and will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 xl:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {showComplaintModal && <ComplaintModal />}
      {showDetailsModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl lg:rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 lg:p-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Complaint Details</h3>
                  <p className="text-gray-600 mt-1">#{selectedComplaint.id}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Complaint Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Title:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                          {selectedComplaint.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                          {selectedComplaint.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.dateSubmitted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium text-gray-900">{selectedComplaint.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Description</h4>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{selectedComplaint.description}</p>
              </div>
              
              {selectedComplaint.resolution && (
                <div>
                  <h4 className="text-lg font-semibold text-green-700 mb-4">Resolution</h4>
                  <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-xl border border-green-200">{selectedComplaint.resolution}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Updates & Activity</h4>
                <div className="space-y-4">
                  {selectedComplaint.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-gray-700">{update.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">by {update.by}</span>
                          <span className="text-xs text-gray-500">{update.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all"
                >
                  Close
                </button>
                <button className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 font-semibold transition-all shadow-lg flex items-center justify-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Add Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintManagementSystem;