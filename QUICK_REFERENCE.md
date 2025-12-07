# Quick Reference - Authentication System

## 🚀 One-Page Quick Start

### 1️⃣ Install
```bash
npm install
```

### 2️⃣ Wrap App
```jsx
<AuthProvider>{children}</AuthProvider>
```

### 3️⃣ Add Button
```jsx
<AuthModal isOpen={open} onClose={() => setOpen(false)} />
```

### 4️⃣ Backend
See: `API_IMPLEMENTATION.js`

---

## 📚 File Locations

| What | File |
|------|------|
| Signup Form | `src/components/SignupForm.jsx` |
| Signin Form | `src/components/SigninForm.jsx` |
| Auth Logic | `src/components/AuthProvider.jsx` |
| Hooks | `src/hooks/useAuth.js` |
| Recommendations | `src/services/PersonalizationService.js` |
| Profile Page | `src/components/UserProfile.jsx` |

---

## 🎣 Custom Hooks

```jsx
// Check if logged in
const { user } = useAuth();

// Get user background
const profile = useUserProfile();

// Sign out
const { signout } = useAuth();
```

---

## 📋 Personalization Service

```jsx
import PersonalizationService from '../services/PersonalizationService';

// Get all recommendations
const recs = PersonalizationService.getRecommendedContent(userProfile);

// Access results
recs.difficulty              // 'beginner' | 'intermediate' | 'advanced' | 'expert'
recs.recommendedModules      // Array of module objects
recs.learningPath            // 4-phase learning path
recs.focusAreas              // Array of suggested topics
```

---

## 🎯 Background Questions Users Answer

**Software**: Beginner → Intermediate → Advanced → Expert
**Hardware**: Beginner → Intermediate → Advanced → Expert
**Experience**: Student / Hobbyist / Professional / Researcher
**Interests**: 7 topics to choose from

---

## 🏆 Form Validation

| Field | Rule |
|-------|------|
| Name | Required, not empty |
| Email | Valid email format |
| Password | Min 8 characters |
| Confirm | Must match password |
| Software | Required selection |
| Hardware | Required selection |
| Experience | Required selection |

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px+

All components automatically adjust!

---

## 🔌 API Endpoints Needed

```
POST   /api/auth/signup       Create account
POST   /api/auth/signin       Login user
POST   /api/auth/signout      Logout
GET    /api/auth/me           Get current user
PUT    /api/auth/profile      Update background
```

---

## 🌈 Color Scheme

- **Primary**: #0066cc (Blue)
- **Secondary**: #ff6b6b (Red)
- **Success**: #4caf50 (Green)
- **Background**: #f9f9f9 (Light gray)
- **Border**: #e0e0e0 (Dark gray)

---

## 📊 Component Props

### AuthModal
```jsx
<AuthModal
  isOpen={boolean}
  onClose={function}
  defaultMode={'signup' | 'signin'}
/>
```

### UserProfile
```jsx
// No props needed
// Uses useAuth hook internally
<UserProfile />
```

### SignupForm
```jsx
<SignupForm
  onSuccess={function}
  onToggle={function}
/>
```

### SigninForm
```jsx
<SigninForm
  onSuccess={function}
  onToggle={function}
/>
```

---

## 🎁 Bonus Points

**50 points** awarded for:
- Complete signup ✓
- Software background ✓
- Hardware background ✓
- Select interests ✓

---

## 🔒 Security Tips

1. Use HTTPS in production
2. Keep JWT_SECRET safe in env vars
3. Set HTTP-only flag on cookies
4. Validate all inputs server-side
5. Keep dependencies updated

---

## ⚡ Performance Tips

1. Memoize PersonalizationService calls
2. Use React.lazy for components
3. Implement code splitting
4. Cache API responses
5. Optimize images

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Module not found | Run `npm install` |
| API fails | Check `REACT_APP_API_URL` |
| User not persisting | Verify `GET /api/auth/me` |
| Styling broken | Ensure CSS modules imported |
| Modal won't open | Check `isOpen` prop |

---

## 📖 Documentation Map

```
START HERE
    ↓
AUTHENTICATION_SETUP.md (5 min read)
    ↓
Choose your path:
    
PATH 1: Want to integrate quickly
→ COMPONENT_EXAMPLES.md
→ Copy-paste code snippets

PATH 2: Need detailed info
→ AUTHENTICATION_GUIDE.md
→ Full technical documentation

PATH 3: Need backend code
→ API_IMPLEMENTATION.js
→ Express.js reference implementation

PATH 4: Want visual overview
→ ARCHITECTURE_DIAGRAMS.md
→ System flows and diagrams
```

---

## ✅ Pre-Launch Checklist

- [ ] Dependencies installed
- [ ] AuthProvider integrated
- [ ] Homepage has auth button
- [ ] Profile page created
- [ ] Backend API deployed
- [ ] Environment variables set
- [ ] Signup/signin tested
- [ ] Mobile tested
- [ ] HTTPS configured

---

## 📈 Monitoring Setup

Track these metrics:
- **Signup Rate**: New users per day
- **Completion Rate**: % reaching step 2
- **Success Rate**: % successful signups
- **Bonus Claims**: Should be ~100%
- **Profile Views**: User engagement
- **Return Rate**: % returning users

---

## 🎓 Learning Paths for Users

Based on background, users get one of these 4 difficulty levels:

**Beginner Path**
- Week 1-2: Robot basics
- Week 3-4: Python & ROS2
- Week 5-6: Simulation
- Week 7-8: Advanced topics

**Intermediate Path**
- Week 1: Foundation review
- Week 2-3: Advanced ROS2
- Week 4-5: Isaac & Hardware
- Week 6-7: AI integration

(And Expert paths...)

---

## 🔧 Customization Ideas

1. **Add more background questions**
   → Edit SignupForm.jsx

2. **Change difficulty calculation**
   → Edit PersonalizationService.js

3. **Add more modules**
   → Update getRecommendedModules()

4. **Custom styling**
   → Edit Auth.module.css

5. **Add OAuth**
   → Extend AuthProvider.jsx

---

## 📞 Quick Contacts

- **Better-Auth Issues**: https://www.better-auth.com/
- **React Questions**: https://react.dev/community
- **Backend Help**: Express.js docs

---

## 🎯 Success Indicators

After launch, you'll know it's working when:
- ✅ Users can sign up
- ✅ Users see their profile
- ✅ Personalization appears
- ✅ Bonus points display
- ✅ Mobile works great
- ✅ Users return frequently
- ✅ Engagement increases

---

## 🚀 You're Ready!

Everything is set up and documented. 

**Start with**: AUTHENTICATION_SETUP.md
**Time needed**: 2-3 hours for full integration
**Difficulty**: Medium (straightforward implementation)

**Good luck!** 🎉

---

**This is your quick reference card. Print it out or bookmark it!**

Last updated: December 7, 2025
