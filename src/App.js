import React, { useState, useEffect, useRef } from 'react';
import { Home, MessageSquare, User, Settings, Video, Bot, LogIn, UserPlus, Globe, Upload, Download, Play, Scissors, Music, Sparkles, DollarSign, Gift, Flag, Heart, MessageCircle, MapPin, X } from 'lucide-react';

// Utility for language translation
const translations = {
    vi: {
        appName: "My App", slogan: "Kết nối, Sáng tạo, Chia sẻ", login: "Đăng nhập", register: "Đăng ký", email: "Email", password: "Mật khẩu", username: "Tên người dùng", welcomeHome: "Chào mừng bạn đến với Trang chủ!", exploreFeed: "Khám phá các bài viết và video mới nhất.", aiChatbot: "AI Chatbot", startChat: "Bắt đầu trò chuyện với AI", groupChat: "Chat Nhóm / Cá nhân", startGroupChat: "Bắt đầu trò chuyện với bạn bè", adminDashboard: "Bảng điều khiển Admin", manageApp: "Quản lý ứng dụng của bạn", liveStream: "Livestream", watchLive: "Xem các buổi livestream hấp dẫn", videoEditor: "Trình chỉnh sửa Video", editVideos: "Chỉnh sửa video chuyên nghiệp", language: "Ngôn ngữ", vietnamese: "Tiếng Việt", english: "Tiếng Anh", loginSuccess: "Đăng nhập thành công!", registerSuccess: "Đăng ký thành công!", loginFailed: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.", registerFailed: "Đăng ký thất bại. Vui lòng thử lại.", logout: "Đăng xuất", send: "Gửi", typeMessage: "Nhập tin nhắn của bạn...", chatHistory: "Lịch sử trò chuyện:", adminWelcome: "Chào mừng đến với Bảng điều khiển Admin", userManagement: "Quản lý Người dùng", postManagement: "Quản lý Bài viết", videoManagement: "Quản lý Video", systemInfo: "Thông tin Hệ thống", adRental: "Cho thuê Quảng cáo", contactForAds: "Liên hệ để thuê quảng cáo", giftCoin: "Tặng Coin", contactToGift: "Liên hệ để tặng Coin qua Gmail/Messenger", noVideosYet: "Chưa có video nào. Hãy tạo video đầu tiên của bạn!", userPlaceholder: "Người dùng", messagePlaceholder: "Tin nhắn", streamPlaceholder: "Livestream đang diễn ra...", giftPlaceholder: "Tặng quà", chatInputPlaceholder: "Nhập tin nhắn...", uploadVideo: "Tải Video lên", downloadVideo: "Tải Video đã chỉnh sửa", preview: "Xem trước", timeline: "Dòng thời gian", cut: "Cắt", addMusic: "Thêm nhạc", addEffect: "Thêm hiệu ứng", editorComingSoon: "Tính năng chỉnh sửa video đang được hoàn thiện! Vui lòng tải video lên để xem trước.", downloading: "Đang tải xuống...", downloadComplete: "Tải xuống hoàn tất! (Video mô phỏng với watermark)", uploading: "Đang tải lên...", uploadComplete: "Tải lên thành công! Video sẵn sàng để chỉnh sửa (mô phỏng).", noVideoLoaded: "Chưa có video nào được tải. Vui lòng tải lên để bắt đầu chỉnh sửa.", testVersion: "Bản thử nghiệm", getMoreTokens: "Nhận thêm Token", contactAdminForTokens: "Để nhận thêm Token, vui lòng liên hệ Admin qua Gmail (quangminh21092009@gmail.com) hoặc Messenger. Admin sẽ manually control và grant Tokens to you.", adRentalTitle: "Cho thuê Quảng cáo", adRentalDescription: "Quảng bá sản phẩm hoặc dịch vụ của bạn trên My App!", adRentalContent: "My App cung cấp không gian quảng cáo hiệu quả để bạn tiếp cận hàng triệu người dùng. Chúng tôi có nhiều gói quảng cáo linh hoạt, phù hợp với mọi ngân sách và mục tiêu. Các vị trí quảng cáo nổi bật bao gồm trên Feed, trong Livestream, và các banner trên các trang khác.", adRentalBenefits: "Lợi ích khi quảng cáo với My App:", benefit1: "Tiếp cận đối tượng rộng lớn và đa dạng.", benefit2: "Tăng cường nhận diện thương hiệu.", benefit3: "Tùy chỉnh mục tiêu quảng cáo.", benefit4: "Hỗ trợ chuyên nghiệp từ đội ngũ của chúng tôi.", adRentalContact: "Để biết thêm thông tin chi tiết về các gói quảng cáo và nhận báo giá, vui lòng liên hệ với chúng tôi qua:", contactEmail: "Email: contact@myapp.com", contactPhone: "Điện thoại: +84 123 456 789", contactForm: "Hoặc điền vào biểu mẫu liên hệ bên dưới:", yourName: "Tên của bạn", yourCompany: "Tên công ty (nếu có)", yourMessage: "Tin nhắn của bạn", submit: "Gửi", reportViolation: "Báo cáo Vi phạm", reportConfirmation: "Bạn có chắc muốn báo cáo video này vì vi phạm nội dung?", reportSuccess: "Báo cáo của bạn đã được gửi. Chúng tôi sẽ xem xét sớm nhất.", violationReports: "Quản lý Báo cáo Vi phạm", viewReports: "Xem các báo cáo vi phạm", likes: "Lượt thích", comments: "Bình luận", typeComment: "Nhập bình luận của bạn...", submitComment: "Gửi bình luận", viewAllComments: "Xem tất cả bình luận", noComments: "Chưa có bình luận nào.", chatManagement: "Quản lý Tin nhắn", viewChatLogs: "Xem nhật ký trò chuyện", locationInfo: "Thông tin Vị trí", viewLocationData: "Xem dữ liệu vị trí", locationDisclaimer: "Dữ liệu vị trí (ví dụ: vị trí IP cuối cùng) có thể được hiển thị tại đây, tùy thuộc vào sự đồng ý của người dùng và chính sách bảo mật. Dữ liệu này sẽ được truy xuất từ các dịch vụ backend an toàn.", chatMonitoringDisclaimer: "Tại đây, admin có thể xem nhật ký trò chuyện của người dùng. Việc này đòi hỏi backend lưu trữ tin nhắn và quyền truy cập đặc biệt, tuân thủ nghiêm ngặt các quy định về quyền riêng tư.", createPost: "Tạo bài viết", whatsOnYourMind: "Bạn đang nghĩ gì?", postContent: "Nội dung bài viết...", addPhotoVideo: "Thêm ảnh/video", post: "Đăng bài", postSuccess: "Bài viết của bạn đã được đăng thành công!", close: "Đóng", postPlaceholder: "Bài viết của tôi...", viewPost: "Xem bài viết", adRentalContactUs: "Liên hệ với chúng tôi"
    },
    en: {
        appName: "My App", slogan: "Connect, Create, Share", login: "Login", register: "Register", email: "Email", password: "Password", username: "Username", welcomeHome: "Welcome to My App Home!", exploreFeed: "Explore the latest posts and videos.", aiChatbot: "AI Chatbot", startChat: "Start chatting with AI", groupChat: "Group / Private Chat", startGroupChat: "Start chatting with friends", adminDashboard: "Admin Dashboard", manageApp: "Manage your application", liveStream: "Livestream", watchLive: "Watch exciting livestreams", videoEditor: "Video Editor", editVideos: "Edit videos professionally", language: "Language", vietnamese: "Vietnamese", english: "English", loginSuccess: "Login successful!", registerSuccess: "Registration successful!", loginFailed: "Login failed. Please check your credentials.", registerFailed: "Registration failed. Please try again.", logout: "Logout", send: "Send", typeMessage: "Type your message...", chatHistory: "Chat History:", adminWelcome: "Welcome to the Admin Dashboard", userManagement: "User Management", postManagement: "Post Management", videoManagement: "Video Management", systemInfo: "System Information", adRental: "Ad Rental", contactForAds: "Contact for ad rental", giftCoin: "Gift Coin", contactToGift: "Contact to gift Coin via Gmail/Messenger", noVideosYet: "No videos yet. Create your first video!", userPlaceholder: "User", messagePlaceholder: "Message", streamPlaceholder: "Livestream in progress...", giftPlaceholder: "Gift", chatInputPlaceholder: "Type a message...", uploadVideo: "Upload Video", downloadVideo: "Download Edited Video", preview: "Preview", timeline: "Timeline", cut: "Cut", addMusic: "Add Music", addEffect: "Add Effect", editorComingSoon: "Video editing features are under development! Please upload a video to preview.", downloading: "Downloading...", downloadComplete: "Download complete! (Simulated video with watermark)", uploading: "Uploading...", uploadComplete: "Upload successful! Video ready for editing (simulated).", noVideoLoaded: "No video loaded. Please upload to start editing.", testVersion: "Test Version", getMoreTokens: "Get More Tokens", contactAdminForTokens: "To receive more Tokens, please contact Admin via Gmail (quangminh21092009@gmail.com) or Messenger. Admin will manually control and grant Tokens to you.", adRentalTitle: "Ad Rental", adRentalDescription: "Promote your product or service on My App!", adRentalContent: "My App offers effective advertising space to reach millions of users. We have flexible advertising packages to suit every budget and goal. Prominent ad placements include on the Feed, within Livestreams, and banners on other pages.", adRentalBenefits: "Benefits of advertising with My App:", benefit1: "Reach a wide and diverse audience.", benefit2: "Increase brand awareness.", benefit3: "Customizable ad targeting.", benefit4: "Professional support from our team.", adRentalContact: "For more detailed information about advertising packages and to get a quote, please contact us via:", contactEmail: "Email: contact@myapp.com", contactPhone: "Phone: +84 123 456 789", contactForm: "Or fill out the contact form below:", yourName: "Your Name", yourCompany: "Your Company (optional)", yourMessage: "Your Message", submit: "Submit", reportViolation: "Report Violation", reportConfirmation: "Are you sure you want to report this video for content violation?", reportSuccess: "Your report has been submitted. We will review it shortly.", violationReports: "Violation Report Management", viewReports: "View violation reports", likes: "Likes", comments: "Comments", typeComment: "Type your comment...", submitComment: "Submit Comment", viewAllComments: "View all comments", noComments: "No comments yet.", chatManagement: "Chat Management", viewChatLogs: "View chat logs", locationInfo: "Location Information", viewLocationData: "View location data", locationDisclaimer: "Location data (e.g., last known IP location) may be displayed here, subject to user consent and privacy policies. This data would be retrieved from secure backend services.", chatMonitoringDisclaimer: "Here, admins can view user chat logs. This requires backend message storage and special access permissions, strictly adhering to privacy regulations.", createPost: "Create Post", whatsOnYourMind: "What's on your mind?", postContent: "Post content...", addPhotoVideo: "Add Photo/Video", post: "Post", postSuccess: "Your post has been created successfully!", close: "Close", postPlaceholder: "My post...", viewPost: "View Post", adRentalContactUs: "Contact Us"
            }
        };

        // Language Context
        const LanguageContext = React.createContext();

        // Component for Page Layout
        const PageLayout = ({ children, title, description }) => (
            <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-900">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-[1.005] max-w-4xl mx-auto border border-gray-700">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 text-center">
                        {description}
                    </p>
                    {children}
                </div>
            </div>
        );

        // Login/Register Page Component
        const AuthPage = ({ setLoggedIn, setCurrentPage }) => {
            const [isLogin, setIsLogin] = useState(true);
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [username, setUsername] = useState('');
            const { lang, setLang, t } = React.useContext(LanguageContext); // Access setLang here

            const handleSubmit = async (e) => {
                e.preventDefault();
                if ((isLogin && email === 'quangminh21092009@gmail.com' && password === 'password123') ||
                    (isLogin && email === 'nguyenquangminhtp7a3@gmail.com' && password === 'password123') ||
                    (!isLogin && username && email && password)) {
                    alert(isLogin ? t('loginSuccess') : t('registerSuccess'));
                    setLoggedIn(true);
                    setCurrentPage('home');
                } else {
                    alert(isLogin ? t('loginFailed') : t('registerFailed'));
                }
            };

            return (
                <PageLayout title={isLogin ? t('login') : t('register')} description={isLogin ? "Đăng nhập để tiếp tục" : "Tạo tài khoản mới"}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-200">{t('username')}</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-inner bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200">{t('email')}</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-inner bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200">{t('password')}</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-inner bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                        >
                            {isLogin ? t('login') : t('register')}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-red-400 hover:text-red-200 font-medium transition-colors"
                        >
                            {isLogin ? t('register') : t('login')}
                        </button>
                    </div>
                    {/* Language Selector on Login Page */}
                    <div className="mt-8 text-center">
                        <div className="relative inline-block text-left">
                            <button className="flex items-center px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors shadow-md">
                                <Globe size={18} className="mr-2" /> {t('language')}
                            </button>
                            <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="py-1">
                                    <button onClick={() => setLang('vi')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">{t('vietnamese')}</button>
                                    <button onClick={() => setLang('en')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">{t('english')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageLayout>
            );
        };

        // Home Page Component (TikTok-like feed placeholder)
        const HomePage = () => {
            const { t } = React.useContext(LanguageContext);
            const [videos, setVideos] = useState([
                { id: 1, user: 'User1', description: 'Video đầu tiên của tôi!', thumbnail: 'https://placehold.co/300x500/000000/FFFFFF?text=Video+1', likes: 120, comments: ['Hay quá!', 'Tuyệt vời!'], isLiked: false },
                { id: 2, user: 'User2', description: 'Khám phá thế giới.', thumbnail: 'https://placehold.co/300x500/000000/FFFFFF?text=Video+2', likes: 50, comments: ['Đẹp quá!', 'Hấp dẫn!'], isLiked: false },
                { id: 3, user: 'User3', description: 'Khoảnh khắc đáng yêu.', thumbnail: 'https://placehold.co/300x500/000000/FFFFFF?text=Video+3', likes: 200, comments: ['Dễ thương!', 'Thích quá!'], isLiked: false },
            ]);
            const [showCommentsForVideo, setShowCommentsForVideo] = useState(null); // Stores video ID for which comments are shown
            const [newCommentText, setNewCommentText] = useState('');

            const [showCreatePostModal, setShowCreatePostModal] = useState(false);
            const [postText, setPostText] = useState('');
            const [postMedia, setPostMedia] = useState(null); // File object

            const handleLike = (videoId) => {
                setVideos(prevVideos => prevVideos.map(video =>
                    video.id === videoId ? { ...video, likes: video.isLiked ? video.likes - 1 : video.likes + 1, isLiked: !video.isLiked } : video
                ));
            };

            const handleReport = (videoId) => {
                if (window.confirm(t('reportConfirmation'))) { // Using window.confirm for demo, replace with custom modal
                    alert(t('reportSuccess'));
                    // In a real app, send report to backend (e.g., Admin Service)
                    console.log(`Video ${videoId} reported.`);
                }
            };

            const handleAddComment = (videoId) => {
                if (newCommentText.trim() === '') return;
                setVideos(prevVideos => prevVideos.map(video =>
                    video.id === videoId ? { ...video, comments: [...video.comments, `Bạn: ${newCommentText}`] } : video
                ));
                setNewCommentText('');
            };

            const handleCreatePost = () => {
                // Simulate posting to backend
                console.log("New post:", { text: postText, media: postMedia?.name });
                alert(t('postSuccess'));
                setPostText('');
                setPostMedia(null);
                setShowCreatePostModal(false);
            };

            const handleMediaChange = (e) => {
                setPostMedia(e.target.files[0]);
            };

            return (
                <PageLayout title={t('welcomeHome')} description={t('exploreFeed')}>
                    {/* Create Post Input */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-2xl mb-6 border border-gray-700">
                        <button
                            onClick={() => setShowCreatePostModal(true)}
                            className="w-full text-left p-3 rounded-full bg-gray-700 text-gray-400 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            {t('whatsOnYourMind')}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.length > 0 ? (
                            videos.map(video => (
                                <div key={video.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 border border-gray-700">
                                    <img src={video.thumbnail} alt={`Video by ${video.user}`} className="w-full h-80 object-cover" />
                                    <div className="p-4 text-white">
                                        <p className="font-bold text-lg">{video.user}</p>
                                        <p className="text-sm text-gray-400">{video.description}</p>
                                        <div className="flex justify-around mt-4 border-t border-gray-700 pt-4">
                                            <button onClick={() => handleLike(video.id)} className={`flex items-center text-white hover:text-red-500 transition-colors ${video.isLiked ? 'text-red-500' : ''}`}>
                                                <Heart size={20} className="mr-1" fill={video.isLiked ? 'currentColor' : 'none'} /> {video.likes}
                                            </button>
                                            <button onClick={() => setShowCommentsForVideo(showCommentsForVideo === video.id ? null : video.id)} className="flex items-center text-white hover:text-red-500 transition-colors">
                                                <MessageCircle size={20} className="mr-1" /> {video.comments.length}
                                            </button>
                                            <button onClick={() => handleReport(video.id)} className="flex items-center text-white hover:text-red-500 transition-colors">
                                                <Flag size={20} className="mr-1" /> {t('reportViolation')}
                                            </button>
                                        </div>
                                        {showCommentsForVideo === video.id && (
                                            <div className="mt-4 p-2 bg-gray-700 rounded-lg border border-gray-600">
                                                <h4 className="text-md font-semibold mb-2 text-gray-200">{t('comments')}</h4>
                                                <div className="max-h-24 overflow-y-auto mb-2 p-1 text-sm text-gray-300 custom-scrollbar">
                                                    {video.comments.length === 0 ? (
                                                        <p className="text-center text-gray-500">{t('noComments')}</p>
                                                    ) : (
                                                        video.comments.map((comment, idx) => (
                                                            <p key={idx} className="mb-1">{comment}</p>
                                                        ))
                                                    )}
                                                </div>
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        value={newCommentText}
                                                        onChange={(e) => setNewCommentText(e.target.value)}
                                                        placeholder={t('typeComment')}
                                                        className="flex-1 p-2 rounded-l-md bg-gray-800 text-white border border-gray-600 focus:ring-red-500 focus:border-red-500"
                                                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(video.id)}
                                                    />
                                                    <button onClick={() => handleAddComment(video.id)} className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-r-md text-sm transition-colors">
                                                        {t('submitComment')}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">{t('noVideosYet')}</p>
                        )}
                    </div>

                    {/* Create Post Modal */}
                    {showCreatePostModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-white">{t('createPost')}</h3>
                                    <button onClick={() => setShowCreatePostModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>
                                <textarea
                                    className="w-full p-3 border border-gray-600 rounded-lg mb-4 resize-y bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                                    rows="4"
                                    placeholder={t('postContent')}
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                ></textarea>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleMediaChange}
                                    className="mb-4 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-700 file:text-white hover:file:bg-red-600 transition-colors"
                                />
                                {postMedia && (
                                    <p className="text-sm text-gray-300 mb-4">Đã chọn: {postMedia.name}</p>
                                )}
                                <button
                                    onClick={handleCreatePost}
                                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    {t('post')}
                                </button>
                            </div>
                        </div>
                    )}
                </PageLayout>
            );
        };

        // AI Chatbot Page Component
        const AIChatbotPage = () => {
            const [messages, setMessages] = useState([]);
            const [input, setInput] = useState('');
            const { t } = React.useContext(LanguageContext);

            const handleSendMessage = async () => {
                if (input.trim() === '') return;

                const newMessage = { role: 'user', text: input };
                setMessages(prev => [...prev, newMessage]);
                setInput('');

                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'ai', text: `AI: ${input.toUpperCase()}!` }]);
                }, 500);
            };

            const handleGetMoreTokens = () => {
                alert(t('contactAdminForTokens'));
            };

            return (
                <PageLayout title={t('aiChatbot')} description={t('startChat')}>
                    <div className="flex flex-col h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl border border-gray-700">
                        <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white custom-scrollbar">
                            {messages.length === 0 && <p className="text-center text-gray-400">{t('chatHistory')} (Chưa có tin nhắn)</p>}
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-600 text-gray-100 shadow-md'}`}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex mb-4">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-600 rounded-l-lg bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder={t('typeMessage')}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-r-lg shadow-md transition-all duration-300"
                            >
                                {t('send')}
                            </button>
                        </div>
                        <button
                            onClick={handleGetMoreTokens}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <Gift size={20} className="mr-2" /> {t('getMoreTokens')}
                        </button>
                    </div>
                </PageLayout>
            );
        };

        // Chat Group/Personal Page Component
        const ChatPage = () => {
            const { t } = React.useContext(LanguageContext);
            const [messages, setMessages] = useState([]);
            const [input, setInput] = useState('');
            const [selectedUser, setSelectedUser] = useState(null); // For personal chat simulation

            const users = [
                { id: 'userA', name: 'Alice' },
                { id: 'userB', name: 'Bob' },
                { id: 'userC', name: 'Charlie' },
            ];

            const handleSendMessage = () => {
                if (input.trim() === '') return;
                const newMessage = { user: 'Me', text: input, timestamp: new Date().toLocaleTimeString() };
                setMessages(prev => [...prev, newMessage]);
                setInput('');
                // In a real app, this would send to a WebSocket service (Livestream Service for chat)
            };

            return (
                <PageLayout title={t('groupChat')} description={t('startGroupChat')}>
                    <div className="flex flex-col md:flex-row h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl border border-gray-700">
                        <div className="w-full md:w-1/4 bg-gray-700 rounded-l-xl p-3 overflow-y-auto mb-4 md:mb-0 md:mr-4 border border-gray-600 custom-scrollbar">
                            <h3 className="font-bold text-lg mb-3 text-gray-200">Người dùng</h3>
                            {users.map(user => (
                                <button
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`block w-full text-left p-2 rounded-lg mb-1 transition-colors ${selectedUser?.id === user.id ? 'bg-red-600 text-white shadow-md' : 'hover:bg-gray-600 text-gray-200'}`}
                                >
                                    {user.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white custom-scrollbar">
                                {messages.length === 0 && <p className="text-center text-gray-400">{t('chatHistory')} (Chưa có tin nhắn)</p>}
                                {messages.map((msg, index) => (
                                    <div key={index} className={`mb-2 ${msg.user === 'Me' ? 'text-right' : 'text-left'}`}>
                                        <span className={`inline-block p-2 rounded-lg ${msg.user === 'Me' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-600 text-gray-100 shadow-md'}`}>
                                            <span className="font-semibold text-red-300">{msg.user}:</span> {msg.text} <span className="text-xs opacity-75 text-gray-300">{msg.timestamp}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border border-gray-600 rounded-l-lg bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                                    placeholder={t('chatInputPlaceholder')}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-r-lg shadow-md transition-all duration-300"
                                >
                                    {t('send')}
                                </button>
                            </div>
                        </div>
                    </div>
                </PageLayout>
            );
        };

        // Livestream Page Component
        const LivestreamPage = () => {
            const { t } = React.useContext(LanguageContext);
            const [chatMessages, setChatMessages] = useState([]);
            const [chatInput, setChatInput] = useState('');

            const handleSendChat = () => {
                if (chatInput.trim() === '') return;
                setChatMessages(prev => [...prev, { user: 'Viewer', text: chatInput }]);
                setChatInput('');
                // In a real app, this would send to a WebSocket service
            };

            const handleGift = () => {
                alert(t('contactToGift')); // Example for gift coin
            };

            return (
                <PageLayout title={t('liveStream')} description={t('watchLive')}>
                    <div className="flex flex-col lg:flex-row h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                        {/* Livestream Video Area */}
                        <div className="flex-1 flex items-center justify-center bg-black relative">
                            <img
                                src="https://placehold.co/800x450/000000/FFFFFF?text=Livestream+Placeholder"
                                alt="Livestream Placeholder"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">LIVE</div>
                            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-lg">Streamer Name</div>
                        </div>

                        {/* Chat and Gift Area */}
                        <div className="w-full lg:w-1/3 bg-gray-800 flex flex-col p-4">
                            <h3 className="text-xl font-bold text-white mb-4">{t('chatHistory')}</h3>
                            <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-700 rounded-lg custom-scrollbar">
                                {chatMessages.length === 0 && <p className="text-center text-gray-400">Chưa có tin nhắn nào.</p>}
                                {chatMessages.map((msg, index) => (
                                    <div key={index} className="mb-2 text-white">
                                        <span className="font-semibold text-red-400">{msg.user}:</span> {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className="flex mb-4">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border border-gray-600 rounded-l-lg bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                                    placeholder={t('chatInputPlaceholder')}
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                                />
                                <button
                                    onClick={handleSendChat}
                                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-r-lg shadow-md transition-all duration-300"
                                >
                                    {t('send')}
                                </button>
                            </div>
                            <button
                                onClick={handleGift}
                                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                {t('giftPlaceholder')} 🎁
                            </button>
                        </div>
                    </div>
                </PageLayout>
            );
        };

        // Admin Dashboard Page Component
        const AdminDashboardPage = () => {
            const { t } = React.useContext(LanguageContext);
            const [showChatLogs, setShowChatLogs] = useState(false);
            const [showLocationData, setShowLocationData] = useState(false);

            const dummyChatLogs = [
                { id: 1, user1: 'Alice', user2: 'Bob', message: 'Hi Bob, how are you?', timestamp: '10:00 AM' },
                { id: 2, user1: 'Bob', user2: 'Alice', message: 'I am good, thanks! And you?', timestamp: '10:01 AM' },
                { id: 3, user1: 'Charlie', user2: 'David', message: 'Check out this new video!', timestamp: '10:05 AM' },
            ];

            const dummyLocationData = [
                { id: 1, user: 'Alice', lastKnownLocation: 'Ho Chi Minh City, Vietnam (IP-based)', timestamp: '10:15 AM' },
                { id: 2, user: 'Bob', lastKnownLocation: 'Singapore (IP-based)', timestamp: '09:30 AM' },
            ];


            return (
                <PageLayout title={t('adminDashboard')} description={t('manageApp')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('userManagement')}</h3>
                            <p className="text-gray-300">Quản lý tài khoản người dùng, xem thông tin chi tiết, khóa/mở khóa tài khoản.</p>
                            <button className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Xem chi tiết</button>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('postManagement')}</h3>
                            <p className="text-gray-300">Duyệt và quản lý các bài viết, video, đảm bảo nội dung phù hợp.</p>
                            <button className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Xem chi tiết</button>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('videoManagement')}</h3>
                            <p className="text-gray-300">Quản lý các video đã tải lên, kiểm tra chất lượng và nội dung.</p>
                            <button className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Xem chi tiết</button>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('systemInfo')}</h3>
                            <p className="text-gray-300">Xem toàn bộ thông tin hệ thống, log hoạt động, và các chỉ số quan trọng.</p>
                            <button className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Xem chi tiết</button>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('adRental')}</h3>
                            <p className="text-gray-300">{t('contactForAds')}</p>
                            <a href="mailto:your.email@example.com" className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Liên hệ</a>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('giftCoin')}</h3>
                            <p className="text-gray-300">{t('contactToGift')}</p>
                            <a href="mailto:your.email@example.com" className="mt-4 inline-block bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Liên hệ</a>
                        </div>
                        {/* New section for Violation Reports */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('violationReports')}</h3>
                            <p className="text-gray-300">Quản lý các báo cáo vi phạm nội dung từ người dùng.</p>
                            <button className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">Xem chi tiết</button>
                        </div>

                        {/* New section for Chat Management */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-3">{t('chatManagement')}</h3>
                            <p className="text-gray-300 mb-4">{t('chatMonitoringDisclaimer')}</p>
                            <button onClick={() => setShowChatLogs(!showChatLogs)} className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                                {showChatLogs ? "Ẩn nhật ký" : t('viewChatLogs')}
                            </button>
                            {showChatLogs && (
                                <div className="mt-4 p-3 bg-gray-700 rounded-lg max-h-48 overflow-y-auto border border-gray-600 custom-scrollbar">
                                    <h4 className="font-semibold mb-2 text-gray-200">Nhật ký trò chuyện mô phỏng:</h4>
                                    {dummyChatLogs.map(log => (
                                        <p key={log.id} className="text-sm text-gray-300 mb-1">
                                            <span className="font-bold text-red-300">{log.user1}</span> to <span className="font-bold text-red-300">{log.user2}</span> at {log.timestamp}: "{log.message}"
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* New section for Location Information */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700 col-span-full">
                            <h3 className="text-xl font-bold text-white mb-3">{t('locationInfo')}</h3>
                            <p className="text-gray-300 mb-4">{t('locationDisclaimer')}</p>
                            <button onClick={() => setShowLocationData(!showLocationData)} className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                                {showLocationData ? "Ẩn dữ liệu" : t('viewLocationData')}
                            </button>
                            {showLocationData && (
                                <div className="mt-4 p-3 bg-gray-700 rounded-lg max-h-48 overflow-y-auto border border-gray-600 custom-scrollbar">
                                    <h4 className="font-semibold mb-2 text-gray-200">Dữ liệu vị trí mô phỏng:</h4>
                                    {dummyLocationData.map(data => (
                                        <p key={data.id} className="text-sm text-gray-300 mb-1">
                                            <span className="font-bold text-red-300">{data.user}</span>: {data.lastKnownLocation} (Thời gian: {data.timestamp})
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </PageLayout>
            );
        };

        // Video Editor Page Component (Conceptual Demo)
        const VideoEditorPage = () => {
            const { t } = React.useContext(LanguageContext);
            const [videoSrc, setVideoSrc] = useState(null);
            const [isProcessing, setIsProcessing] = useState(false);
            const fileInputRef = useRef(null);
            const canvasRef = useRef(null); // Ref for the canvas element

            // Function to draw the watermark on a canvas
            const drawWatermark = (ctx, canvasWidth, canvasHeight, appName) => {
                // Draw the "M" logo (similar to TikTok's M)
                const drawMLogo = (x, y, scale, fillColor, opacity = 1) => {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.scale(scale, scale);
                    ctx.fillStyle = fillColor;
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.moveTo(10, 30); ctx.lineTo(15, 10); ctx.lineTo(20, 25); ctx.lineTo(25, 10); ctx.lineTo(30, 30); ctx.lineTo(27, 30); ctx.lineTo(22, 15); ctx.lineTo(17, 30); ctx.lineTo(13, 30); ctx.closePath(); ctx.fill(); ctx.restore();
                };
                drawMLogo(20, 20, 1, '#000000');
                drawMLogo(20 + 1.5, 20 + 1.5, 1, '#FF0000');
                drawMLogo(20 - 1.5, 20 - 1.5, 1, '#FFFFFF', 0.6);

                // Draw the app name as text watermark
                ctx.font = 'bold 48px Inter'; // Larger font for better visibility
                ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Red color, semi-transparent
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                const text = appName;
                // Position watermark in bottom right corner with padding
                ctx.fillText(text, canvasWidth - 20, canvasHeight - 20);
            };


            const handleFileUpload = (event) => {
                const file = event.target.files[0];
                if (file && file.type.startsWith('video/')) {
                    setIsProcessing(true);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setVideoSrc(reader.result);
                        setIsProcessing(false);
                        alert(t('uploadComplete'));
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("Vui lòng tải lên một tệp video hợp lệ.");
                }
            };

            const handleDownload = () => {
                if (!videoSrc) {
                    alert(t('noVideoLoaded'));
                    return;
                }

                setIsProcessing(true);
                // Simulate video processing and watermarking
                setTimeout(() => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;

                    const ctx = canvas.getContext('2d');
                    const videoElement = document.createElement('video');
                    videoElement.src = videoSrc;
                    videoElement.crossOrigin = "anonymous"; // Needed if video is from different origin

                    videoElement.onloadedmetadata = () => {
                        canvas.width = videoElement.videoWidth;
                        canvas.height = videoElement.videoHeight;

                        if (videoElement.readyState >= 2) { // Check if video metadata is loaded
                            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                        } else {
                            // Fallback to a placeholder image if video cannot be drawn to canvas directly
                            const img = new Image();
                            img.src = `https://placehold.co/${canvas.width}x${canvas.height}/333333/FFFFFF?text=My+App+Video`;
                            img.onload = () => {
                                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                                drawWatermark(ctx, canvas.width, canvas.height, t('appName')); // Draw watermark on placeholder
                                finalizeDownload(canvas);
                            };
                            img.onerror = () => {
                                // If placeholder also fails, draw a simple colored rectangle
                                ctx.fillStyle = '#333333';
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = '#FFFFFF';
                                ctx.font = '24px Arial';
                                ctx.textAlign = 'center';
                                ctx.fillText('Video Placeholder', canvas.width / 2, canvas.height / 2);
                                drawWatermark(ctx, canvas.width, canvas.height, t('appName'));
                                finalizeDownload(canvas);
                            };
                            return; // Exit to wait for image to load
                        }

                        drawWatermark(ctx, canvas.width, canvas.height, t('appName')); // Draw watermark
                        finalizeDownload(canvas);
                    };

                    videoElement.onerror = (e) => {
                        console.error("Error loading video for canvas:", e);
                        // Fallback to drawing a placeholder with watermark if video can't be loaded
                        const img = new Image();
                        img.src = `https://placehold.co/${canvas.width}x${canvas.height}/333333/FFFFFF?text=My+App+Video`;
                        img.onload = () => {
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            drawWatermark(ctx, canvas.width, canvas.height, t('appName'));
                            finalizeDownload(canvas);
                        };
                    };
                }, 1500); // Simulate processing time

                const finalizeDownload = (canvas) => {
                    const dataURL = canvas.toDataURL('image/png'); // Convert canvas to image data URL
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = 'my-app-video-watermarked.png'; // Download as PNG, not actual video
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setIsProcessing(false);
                    alert(t('downloadComplete'));
                };
            };


            return (
                <PageLayout title={t('videoEditor')} description={t('editVideos')}>
                    <div className="flex flex-col lg:flex-row h-[700px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                        {/* Left Panel: Preview and Controls */}
                        <div className="flex flex-col w-full lg:w-2/3 p-4">
                            <h3 className="text-xl font-bold text-white mb-4">{t('preview')}</h3>
                            <div className="flex-1 bg-black rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                                {videoSrc ? (
                                    <video controls src={videoSrc} className="max-w-full max-h-full object-contain rounded-lg" />
                                ) : (
                                    <div className="text-gray-500 text-center p-4">
                                        <Video size={64} className="mx-auto mb-4 text-gray-600" />
                                        <p>{t('noVideoLoaded')}</p>
                                    </div>
                                )}
                                {isProcessing && (
                                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white text-xl font-bold z-10">
                                        {t('uploading')} / {t('downloading')}...
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <Upload size={20} className="mr-2" /> {t('uploadVideo')}
                                </button>
                                <input
                                    type="file"
                                    accept="video/*"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={handleDownload}
                                    disabled={!videoSrc || isProcessing}
                                    className={`flex items-center justify-center font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform ${!videoSrc || isProcessing ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white hover:scale-105'}`}
                                >
                                    <Download size={20} className="mr-2" /> {t('downloadVideo')}
                                </button>
                                <button
                                    disabled={!videoSrc}
                                    className={`flex items-center justify-center font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform ${!videoSrc ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'}`}
                                >
                                    <Scissors size={20} className="mr-2" /> {t('cut')}
                                </button>
                                <button
                                    disabled={!videoSrc}
                                    className={`flex items-center justify-center font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform ${!videoSrc ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'}`}
                                >
                                    <Music size={20} className="mr-2" /> {t('addMusic')}
                                </button>
                                <button
                                    disabled={!videoSrc}
                                    className={`flex items-center justify-center font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform ${!videoSrc ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'}`}
                                >
                                    <Sparkles size={20} className="mr-2" /> {t('addEffect')}
                                </button>
                            </div>
                        </div>

                        {/* Right Panel: Timeline (Conceptual) */}
                        <div className="w-full lg:w-1/3 bg-gray-800 flex flex-col p-4">
                            <h3 className="text-xl font-bold text-white mb-4">{t('timeline')}</h3>
                            <div className="flex-1 bg-gray-700 rounded-lg p-3 flex items-center justify-center text-gray-400 text-center border border-gray-600">
                                <p>{t('editorComingSoon')}</p>
                            </div>
                        </div>
                    </div>
                    {/* Hidden canvas for watermark generation */}
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </PageLayout>
            );
        };

        // Ad Rental Page Component
        const AdRentalPage = () => {
            const { t } = React.useContext(LanguageContext);
            const [name, setName] = useState('');
            const [company, setCompany] = useState('');
            const [message, setMessage] = useState('');

            const handleSubmit = (e) => {
                e.preventDefault();
                alert(`Thông tin liên hệ đã được gửi:\nTên: ${name}\nCông ty: ${company}\nTin nhắn: ${message}\nChúng tôi sẽ liên hệ lại sớm nhất!`);
                setName('');
                setCompany('');
                setMessage('');
            };

            return (
                <PageLayout title={t('adRentalTitle')} description={t('adRentalDescription')}>
                    <div className="text-gray-200 mb-8">
                        <p className="mb-4">{t('adRentalContent')}</p>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('adRentalBenefits')}</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>{t('benefit1')}</li>
                            <li>{t('benefit2')}</li>
                            <li>{t('benefit3')}</li>
                            <li>{t('benefit4')}</li>
                        </ul>
                    </div>

                    <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-inner border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-3">{t('adRentalContact')}</h3>
                        <p className="mb-2 text-gray-300">{t('contactEmail')}</p>
                        <p className="mb-4 text-gray-300">{t('contactPhone')}</p>
                        <a href={`mailto:${translations.en.contactEmail.split(': ')[1]}`} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105">
                            <MessageSquare size={20} className="mr-2" /> {t('adRentalContactUs')}
                        </a>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{t('contactForm')}</h3>
                    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-800 rounded-xl shadow-inner border border-gray-700">
                        <div>
                            <label htmlFor="yourName" className="block text-sm font-medium text-gray-200">{t('yourName')}</label>
                            <input
                                type="text"
                                id="yourName"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-inner bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="yourCompany" className="block text-sm font-medium text-gray-200">{t('yourCompany')}</label>
                            <input
                                type="text"
                                id="yourCompany"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-inner bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="yourMessage" className="block text-sm font-medium text-gray-200">{t('yourMessage')}</label>
                            <textarea
                                id="yourMessage"
                                rows="4"
                                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-inner bg-gray-700 text-white focus:ring-red-500 focus:border-red-500 sm:text-sm resize-y transition-colors"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                        >
                            {t('submit')}
                        </button>
                    </form>
                </PageLayout>
            );
        };


        // Main App Component
        export default function App() {
            const [isLoggedIn, setLoggedIn] = useState(false);
            const [currentPage, setCurrentPage] = useState('login'); // Default to login page
            const [lang, setLang] = useState('vi'); // Default language

            useEffect(() => {
                // Auto-detect language based on browser preference (simplified)
                const browserLang = navigator.language.split('-')[0];
                if (translations[browserLang]) {
                    setLang(browserLang);
                }
            }, []);

            const t = (key) => translations[lang][key] || key;

            const handleLogout = () => {
                setLoggedIn(false);
                setCurrentPage('login');
            };

            const renderPage = () => {
                if (!isLoggedIn) {
                    return <AuthPage setLoggedIn={setLoggedIn} setCurrentPage={setCurrentPage} />;
                }

                switch (currentPage) {
                    case 'home':
                        return <HomePage />;
                    case 'chatbot':
                        return <AIChatbotPage />;
                    case 'chat':
                        return <ChatPage />;
                    case 'livestream':
                        return <LivestreamPage />;
                    case 'videoEditor':
                        return <VideoEditorPage />;
                    case 'admin':
                        // For admin access, you'd typically check user role from backend
                        // For this demo, we'll just show the page if logged in and navigate there
                        return <AdminDashboardPage />;
                    case 'adRental':
                        return <AdRentalPage />;
                    default:
                        return <HomePage />;
                }
            };

            return (
                <LanguageContext.Provider value={{ lang, setLang, t }}>
                    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
                        {/* Header/Navigation */}
                        <header className="bg-black text-white p-4 shadow-lg flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center mb-4 md:mb-0">
                                {/* Custom SVG Logo - M like TikTok */}
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                    <defs>
                                        {/* A stylized 'M' shape */}
                                        <path id="m-path" d="M10 30 L15 10 L20 25 L25 10 L30 30 L27 30 L22 15 L17 30 L13 30 Z"/>
                                    </defs>

                                    {/* Black layer */}
                                    <use href="#m-path" fill="#000000" transform="translate(0, 0)"/>
                                    {/* Red layer (offset slightly down-right) */}
                                    <use href="#m-path" fill="#FF0000" transform="translate(1.5, 1.5)"/>
                                    {/* White highlight (offset slightly up-left) */}
                                    <use href="#m-path" fill="#FFFFFF" transform="translate(-1.5, -1.5)" opacity="0.6"/>
                                </svg>
                                <h1 className="text-3xl font-extrabold text-white">{t('appName')}</h1>
                                {/* Test Version Badge */}
                                <span className="ml-4 px-3 py-1 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full shadow-md">
                                    {t('testVersion')}
                                </span>
                            </div>
                            {isLoggedIn && (
                                <nav className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4 text-sm md:text-base">
                                    <button onClick={() => setCurrentPage('home')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <Home size={18} className="mr-1" /> {t('home')}
                                    </button>
                                    <button onClick={() => setCurrentPage('chatbot')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <Bot size={18} className="mr-1" /> {t('aiChatbot')}
                                    </button>
                                    <button onClick={() => setCurrentPage('chat')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <MessageSquare size={18} className="mr-1" /> {t('groupChat')}
                                    </button>
                                    <button onClick={() => setCurrentPage('livestream')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <Video size={18} className="mr-1" /> {t('liveStream')}
                                    </button>
                                    <button onClick={() => setCurrentPage('videoEditor')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <Settings size={18} className="mr-1" /> {t('videoEditor')}
                                    </button>
                                    <button onClick={() => setCurrentPage('adRental')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <DollarSign size={18} className="mr-1" /> {t('adRental')}
                                    </button>
                                    {/* Admin link only visible if logged in and could be conditionally rendered based on user role */}
                                    <button onClick={() => setCurrentPage('admin')} className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                        <User size={18} className="mr-1" /> {t('adminDashboard')}
                                    </button>
                                    <div className="relative inline-block text-left">
                                        <button className="flex items-center px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                                            <Globe size={18} className="mr-1" /> {t('language')}
                                        </button>
                                        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div className="py-1">
                                                <button onClick={() => setLang('vi')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">{t('vietnamese')}</button>
                                                <button onClick={() => setLang('en')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">{t('english')}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
                                        <LogIn size={18} className="mr-1" /> {t('logout')}
                                    </button>
                                </nav>
                            )}
                        </header>

                        {/* Main Content Area */}
                        <main className="flex-1 flex flex-col items-center justify-center p-4">
                            {renderPage()}
                        </main>

                        {/* Footer */}
                        <footer className="bg-black text-gray-400 text-center p-4 text-sm shadow-inner">
                            <p>&copy; 2025 {t('appName')}. {t('slogan')}.</p>
                        </footer>
                    </div>
                </LanguageContext.Provider>
            );
        }
        